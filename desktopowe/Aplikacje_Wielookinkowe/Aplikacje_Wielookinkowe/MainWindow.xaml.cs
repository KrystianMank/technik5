using System.Runtime.CompilerServices;
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

namespace Aplikacje_Wielookinkowe
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public ShareModel shareModel { get; set; } = new ShareModel();
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btn1_Click(object sender, RoutedEventArgs e)
        {
            MainFrame.Navigate(new Page1("niger"));
            
        }

        private void btn2_Click(object sender, RoutedEventArgs e)
        {
            //przekazywanie przez model
            var page2 = new Page2();
            page2.DataContext = shareModel;
            MainFrame.Navigate(page2);
        }
    }

    public class ShareModel
    {
        public string SharedFirstName { get; set; } = "Joanna";

    }
}