require('dotenv').config();
const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 8001;
const app = express();
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

app.post('/get_data', (req, res) => {
    const Client = require('@veryfi/veryfi-sdk');
    const client_id = process.env.VERYFI_API_CLIENT_ID;
    const client_secret = process.env.VERYFI_API_CLIENT_SECRET;
    const username = process.env.VERYFI_API_USER_NAME;
    const api_key = process.env.VERYFI_API_API_KEY;
    
    const categories = ['Grocery', 'Utilities', 'Travel'];
    
    let veryfi_client = new Client(client_id, client_secret, username, api_key);
    
    let file_name = req.body.file_name;
    let file_base64_encoded = req.body.file_data;

    let response = veryfi_client.process_document_buffer(file_base64_encoded, file_name, categories);
    response.then(function(result) {
      console.log('ocr successfully!');
      res.send(result);
   })  
    
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});