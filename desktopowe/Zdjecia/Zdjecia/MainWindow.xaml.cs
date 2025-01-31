using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;
using Microsoft.Win32;

namespace Zdjecia
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

        }
        int i = 0;
        private void dodajButton_Click(object sender, RoutedEventArgs e)
        {
            
            OpenFileDialog openFileDialog = new OpenFileDialog()
            {
                Filter = "png|*.png|jpg|*.jpg"
            };
            RowDefinition rowDefinition = new RowDefinition();
            rowDefinition.Height = GridLength.Auto;
            panel.RowDefinitions.Add(rowDefinition);
            
            if (openFileDialog.ShowDialog() == true)
            { 
                Image image = new Image();
                image.Source = new BitmapImage(new Uri(openFileDialog.FileName));
                image.Width = 200;
                image.Margin = new Thickness(10);
              
               
                Grid.SetRow(image, i);
                Grid.SetColumn(image, 0);
                panel.Children.Add(image);


                Label label = new Label();
                FileInfo fileInfo = new FileInfo(openFileDialog.FileName);
                string fileName = fileInfo.Name;
                long fileSize = fileInfo.Length;
                string dd = $"Nazwa pliku: {fileName} \nRozmiar:{ fileSize / 1024.0:F2} KB";
                label.Content = dd;
                Grid.SetRow(label, i);
                Grid.SetColumn(label, 1);
                panel.Children.Add(label);

                image.MouseLeftButtonDown += (s, ev) =>
                { 
                    Window1 imageWindow = new Window1(openFileDialog.FileName); 
                    imageWindow.ShowDialog(); 
                };
            }
            i++;
        }
    }
}