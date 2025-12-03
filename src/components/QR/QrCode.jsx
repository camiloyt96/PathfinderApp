import { QRCodeSVG } from 'qrcode.react';

export default function AppQRCode() {
  const appURL = "http://pathfinder-hub.s3-website-us-east-1.amazonaws.com";
  
  return (
    <div className="text-center p-4 text-white">
      <h3>Escanea para acceder</h3>
      <QRCodeSVG 
        value={appURL}
        size={256}
        level="H" // Alta corrección de errores
        includeMargin={true}
      />
      <p className="mt-2">{appURL}</p>
    </div>
  );
}