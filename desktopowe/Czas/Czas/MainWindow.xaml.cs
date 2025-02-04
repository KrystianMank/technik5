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

namespace Czas
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

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            int dzien, miesiac, rok;
            if(!int.TryParse(dzienTextBox.Text, out dzien))
            {
                return;
            }
            if(!int.TryParse(miesiacTextBox.Text, out miesiac))
            {
                return;
            }
            if(!int.TryParse(rokTextBox.Text, out rok))
            {
                return;
            }
           

            try
            {
                string currentTimeString = DateTime.Now.ToString("hh:mm:ss");
                DateTime currentTime = DateTime.Now;

                int IntLocalShift = (int)TimeZoneInfo.Local.BaseUtcOffset.TotalHours;

                DateTime dateTime = new DateTime(rok, miesiac, dzien, currentTime.Hour, currentTime.Minute, currentTime.Second);

                DateTime timeOffset = dateTime.AddHours(4 - IntLocalShift);

                MessageBox.Show($"{dzien}-{miesiac}-{rok}\t{currentTimeString}\n" +
                    $"UTC+4: {timeOffset}");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Nie ma takiej daty");
            }

            

       
        }
    }
}