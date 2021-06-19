import jsPDF from 'jspdf';
import jpt from 'jspdf-autotable';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";


// define a generatePDF function that accepts a tickets argument


const generatePDFLebels = shipments => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = ["Number", "Category", "Weight", "Receiver", "Status", "shipping_date"];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array



    // for each ticket pass all its data into an array
    shipments.forEach(shipment => {
        const shipmentData = [
            shipment.number,
            shipment.category,
            shipment.weight,
            shipment.receiver,
            shipment.status,
            // called date-fns to format the date on the ticket
            format(new Date(shipment.shipping_date), "yyyy-MM-dd")
        ];
        // push each tickcet's info into a row
        tableRows.push(shipmentData);
        var img = new Image()
        img.src = '/QR.png'
        doc.addImage(img, 'png', 75, 50, 50, 50)
    });



    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text("Shipment Labels", 80, 20);
    // we define the name of our PDF file.
    doc.save(`shipment_labels.pdf`);
};

export default generatePDFLebels;