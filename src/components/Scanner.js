import { WebTwain } from 'dwt/dist/dwt.umd';

const Scanner = () => {
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const initScanner = async () => {
      const dwt = new WebTwain();
      await dwt.Init();
      setScanner(dwt);
    };
    initScanner();
  }, []);

  const scanDocument = async () => {
    if (!scanner) return;
    scanner.SelectSource(); // Opens scanner dialog
    scanner.AcquireImage(); // Starts scanning
  };

  return <button onClick={scanDocument}>Scan with TWAIN</button>;
};