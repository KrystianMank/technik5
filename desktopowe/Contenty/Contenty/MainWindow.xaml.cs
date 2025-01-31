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

namespace Contenty
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

        private void btn1_Click(object sender, RoutedEventArgs e)
        {
            MainContent.Content = new UserControl1("Tekst z konstruktora");
        }

        private void btn2_Click(object sender, RoutedEventArgs e)
        {
            var userControl2 = new UserControl2 { wiadomosc = "Inny tekst" };
            MainContent.Content = userControl2;
        }
    }
}