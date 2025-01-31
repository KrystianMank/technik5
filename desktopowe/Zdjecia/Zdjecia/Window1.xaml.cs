using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Zdjecia
{
    /// <summary>
    /// Logika interakcji dla klasy Window1.xaml
    /// </summary>
    public partial class Window1 : Window
    {
        private Image image;
        public Window1(string path)
        {
            InitializeComponent();
            image = new Image();
            image.Source = new BitmapImage(new Uri(path));
            image.Margin = new Thickness(20);
            image.Width = 400;
            image.Height = 400;
            image.Name = "img";
            Grid.SetRow(image,0);
            panel.Children.Add(image);
        }

        private void pomniejszButton_Click(object sender, RoutedEventArgs e)
        {
            image.Width *= 0.9; 
            image.Height *= 0.9;
        }

        private void powiekszButton_Click(object sender, RoutedEventArgs e)
        {
            image.Width *= 1.1;
            image.Height *= 1.1;
        }
    }
}
