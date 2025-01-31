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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Contenty
{
    /// <summary>
    /// Logika interakcji dla klasy UserControl2.xaml
    /// </summary>
    public partial class UserControl2 : UserControl
    {
        public static readonly DependencyProperty WiadomoscProperty = 
            DependencyProperty.Register("Wiadomosc", typeof(string), typeof(UserControl2), new PropertyMetadata(string.Empty));
        
        public string wiadomosc
        {
            get => (string)GetValue(WiadomoscProperty);
            set => SetValue(WiadomoscProperty, value);
        }
        public UserControl2()
        {

            InitializeComponent();
        }
    }
}
