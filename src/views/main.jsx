import React, { useEffect, useState } from "react";
import testImg from "../assets/images/receipt_sample.png";
import axios from "axios";
import ImageMagnifier from "../components/Imagemagnifier";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "../App.css";
import Loader from "../components/Loader";

const BASE_URL="http://localhost:8001";

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeHandler = (event) => {
    // get upload file object
    let file = event.target.files[0];

    // get and set Base64 of uploaded file
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setSelectedFile(file);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get Base64 of uploaded file
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    // fetch result data from node server
    const fetchData = async () => {  
      setLoading(true);    
      await axios
        .post(`${BASE_URL}/get_data`, {
          file_name:selectedFile.name,
          file_data:selectedFile.base64
        })
        .then((response) => {          
          setResultData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("There was an error!", error);
        });
    };

    selectedFile && fetchData();
  }, [selectedFile]);

  // get valid google map url from full address
  const getValidGoogleMapURL = (address) => {
    let validAddress = "https://www.google.com/maps/search/?api=1&query=";

    if (address !== undefined) {
      const addressArray = address.split(" ");
      const addrLength = addressArray.length;
      addressArray.forEach((addr, idx) => {
        validAddress =
          validAddress + addr + (idx === addrLength - 1 ? "" : "+");
      });
    }

    return validAddress;
  };

  return (
    <>
    {
      loading && (
        <Loader />
      )
    }
      <div className="flex items-center justify-center w-full py-2 px-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={changeHandler}
          />
        </label>
      </div>
      <div id="demo-container" className="receipt py-2 px-4">
        <div id="preview-container" className="preview-image bg-[#5f9ea0]">
          <ImageMagnifier
            className="cursor-none"
            src={resultData ? resultData.img_url : testImg}
          />
        </div>
        <div id="results-container" className="results-container no-padding">
          <div className="results">
            <div
              id="results-pretty"
              className="w-full results-pretty-container results-pretty clearfix tab-pane active"
              aria-labelledby="results-pretty-tab"
              role="tabpanel"
              aria-hidden="false"
            >
              <table id="results-pretty-invoice-receipt">
                <tbody>
                  <tr
                    className={`vendor-image ${resultData ? "" : "invisible"}`}
                  >
                    <td colSpan="2">
                      <img src={resultData?.vendor.logo} alt="vendor" />
                    </td>
                  </tr>
                </tbody>
                <tbody className="extra-fields">
                  <tr>
                    <td className="results-label">Vendor Name</td>
                    <td className="results-value">
                      {resultData?.vendor.name || ""}
                      <span className="ml-1">
                        {resultData?.store_number || ""}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Vendor Address</td>
                    <td className="results-value">
                      {resultData?.vendor.address || ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Vendor on Map</td>
                    <td className="results-value">
                      {resultData && (
                        <a
                          href={getValidGoogleMapURL(
                            resultData?.vendor.address
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          view map
                        </a>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Vendor Phone</td>
                    <td className="results-value">
                      {resultData?.vendor.phone_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Vendor Types</td>
                    <td className="results-value">{resultData?.vendor.type}</td>
                  </tr>
                  <tr>
                    <td className="results-label">Category</td>
                    <td className="results-value">
                      {resultData?.vendor.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Payment Type</td>
                    <td className="results-value">
                      {resultData?.payment.type}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Invoice Number</td>
                    <td className="results-value">
                      {resultData?.invoice_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="results-label">Date</td>
                    <td className="results-value">
                      {resultData?.date || resultData?.created_date}
                    </td>
                  </tr>
                </tbody>
                <tbody className="line-fields">
                  <tr className="line-items">
                    <td colSpan="2">
                      <table className="table-line-items" width="100%">
                        <tbody>
                          <tr className="line-item">
                            <td className="results-head sku">SKU</td>
                            <td className="results-head description">
                              DESCRIPTION
                            </td>
                            <td className="results-head results-amount price">
                              PRICE
                            </td>
                            <td className="results-head results-amount qty">
                              QTY
                            </td>
                            <td className="results-head results-amount total">
                              TOTAL
                            </td>
                          </tr>
                          {resultData?.line_items?.map((item) => (
                            <tr key={item.id} className="line-item">
                              <td className="font-normal results-label sku">
                                {item.sku || ""}
                              </td>
                              <td className="results-value description">
                                {item.description || ""}
                              </td>
                              <td className="results-amount price">
                                {item.price || ""}
                              </td>
                              <td className="results-amount qty">
                                {item.quantity || ""}
                              </td>
                              <td className="results-amount total">
                                {item.total || ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {resultData?.tax_lines?.map((tax, idx) => (
                    <tr key={`tax-item-${idx}`} className="tax-items">
                      <td colSpan="2">
                        <table className="table-tax-items" width="100%">
                          <tbody>
                            <tr className="tax-item">
                              <td className="results-label"></td>
                              <td className="results-value text-right">
                                {tax.name + "(" + tax.rate + "%)"}
                              </td>
                              <td className="results-amount">
                                {tax.total || ""}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className="total-fields">
                  <tr className="totals">
                    <td colSpan="2">
                      <table width="100%">
                        <tbody>
                          <tr
                            className={`subtotal ${resultData?.subtotal ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              Subtotal (
                              <span className="results-currency">
                                {resultData?.currency_code}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.subtotal}
                            </td>
                          </tr>
                          <tr
                            className={`discount ${resultData?.discount ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              Discount (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.discount || ""}
                            </td>
                          </tr>
                          <tr
                            className={`shipping ${resultData?.shipping ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              Shipping (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.shipping || ""}
                            </td>
                          </tr>
                          <tr
                            className={`tax ${resultData?.tax ? "" : "hidden"}`}
                          >
                            <td className="results-label-right">
                              Tax (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.tax || ""}
                            </td>
                          </tr>
                          <tr
                            className={`tip ${resultData?.tip ? "" : "hidden"}`}
                          >
                            <td className="results-label-right">
                              Tip (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.tip || ""}
                            </td>
                          </tr>
                          <tr
                            className={`cashback ${resultData?.cashback ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              Cashback (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.cashback || ""}0.00
                            </td>
                          </tr>
                          <tr
                            className={`rounding ${resultData?.rounding ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              Rounding (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.rounding || ""}0.00
                            </td>
                          </tr>
                          <tr
                            className={`total ${resultData?.total ? "" : "hidden"
                              }`}
                          >
                            <td className="results-label-right">
                              TOTAL (
                              <span className="results-currency">
                                {resultData?.currency_code || ""}
                              </span>
                              )
                            </td>
                            <td className="results-amount">
                              {resultData?.total || ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="results-rating">
            <div>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="results-pretty-invoice-receipt"
                filename="xlsdownload"
                sheet="receipt"
                buttonText="Download as XLS"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
