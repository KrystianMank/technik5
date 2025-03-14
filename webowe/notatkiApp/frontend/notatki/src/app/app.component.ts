import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Note{
  id: number,
  title: string,
  content: string,
  image?:string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit{
  noteForm: FormGroup;
  notes: Note[] = [];
  editNoteId: number | null = null;

  constructor(private fb: FormBuilder, private http:HttpClient){
    this.noteForm = this.fb.group({
      title:[''],
      content:[''],
      image:[null]
    });
  };

  ngOnInit(): void {
      this.loadNotes();
  }

  // metoda do pobierania notatek z API
  loadNotes(){
    this.http.get<Note[]>('http://localhost:5000/notes').subscribe( (data) =>{
      this.notes = data;
    });
  }

  //edycja notatki
  editNote(note: Note){
    this.editNoteId = note.id;
    this.noteForm.patchValue({
      title: note.title,
      content: note.content,
      image: note.image
    });
  }

  //dodawanie lub edycja
  saveNote(){
    const formData = new FormData();
    formData.append('title', this.noteForm.value.title);
    formData.append('content', this.noteForm.value.content);

    if(this.noteForm.value.image instanceof File){
      formData.append('image', this.noteForm.value.image);
    }
    else{
      formData.append('image', this.noteForm.value.image || '');
    }

    // aktualizacja
    if(this.editNoteId){
      this.http.put<{message: string, imageUrl?: string}>(`http://localhost:5000/notes/${this.editNoteId}`, formData)
      .subscribe(response => {
        const index = this.notes.findIndex(n => n.id === this.editNoteId);
        if(index != -1){
          this.notes[index] = {
            id: this.editNoteId as number,
            title: this.noteForm.value.title as string,
            content: this.noteForm.value.content as string,
            image: response.imageUrl || this.notes[index].image
          }
        }
        this.noteForm.reset();
        this.editNoteId = null;
      });
    }
    else{
      this.http.post<{id: number, imageUrl: string}>('http://localhost:5000/upload', formData)
      .subscribe(response => {
        this.notes.push({
            id: response.id,
            title: this.noteForm.value.title as string,
            content: this.noteForm.value.content as string,
            image: response.imageUrl
        });
        this.noteForm.reset();
      });
    }

  }

  deleteNote(id: number){
    this.http.delete(`http://localhost:5000/notes/${id}`).subscribe(() => {
      this.notes = this.notes.filter(note => note.id != id);
    })
  }

  // obsługa pliku
  onFileChange(event: Event){
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file){
      this.noteForm.patchValue({image: file});
    }
  }
}
