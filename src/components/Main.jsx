import React, { useEffect } from "react";
import { useState } from "react";
import { taxRates } from "../rates";

const Main = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [displayText, setDisplayText] = useState();
  const [investmentType, setInvestmentType] = useState(false);
  const [purchase, setPurchase] = useState("$");
  const [sale, setSale] = useState("$");
  const [expenses, setExpenses] = useState("$");
  const [capitalGainAmt, setCapitalGainAmt] = useState("$");
  const [discountLoenTermGains, setDiscountLoenTermGains] = useState("$");
  const [netCapitalGains, setNetCapitalGains] = useState();
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const selectedOption = taxRates.find(
      (option) => option.label === selectedValue
    );
    if (selectedOption) {
      setDisplayText(selectedOption.value);
    } else {
      setDisplayText("");
    }
    if (!investmentType) {
      setCapitalGainAmt(
        parseInt(sale.slice(1) - purchase.slice(1) - expenses.slice(1))
      );
      setDiscountLoenTermGains(capitalGainAmt / 2);
      setNetCapitalGains(capitalGainAmt - discountLoenTermGains);
    } else {
      setCapitalGainAmt(0);
      setDiscountLoenTermGains(0);
      setNetCapitalGains(
        parseInt(sale.slice(1) - purchase.slice(1) - expenses.slice(1))
      );
    }
    switch (selectedValue) {
      case "$0 - $18,200":
        setTax(0);
        break;
      case "$18,201 - $45,000":
        setTax((19 * netCapitalGains) / 100);
        break;
      case "$45,201 - $120,000":
        setTax((32.5 * netCapitalGains) / 100);
        break;
      case "$120,001 - $180,000":
        setTax((37 * netCapitalGains) / 100);
        break;
      case "$180,001+":
        setTax((45 * netCapitalGains) / 100);
        break;
    }
  }, [
    selectedValue,
    purchase,
    sale,
    expenses,
    capitalGainAmt,
    discountLoenTermGains,
    investmentType,
    selectedValue,
  ]);

  return (
    <div className="main_container">
      <h2>Free Crypto Tax Calculator Australia</h2>

      <div className="financial_dropdown dflex">
        <div className="financial_year width200">
          <label className="font_size">Financial Year</label>
          <select name="" className="width150">
            <option value="" selected>
              FY 2023-24
            </option>
          </select>
        </div>
        <div className="country width200">
          <label className="font_size">Country</label>
          <select name="" className="width150">
            <option value="" selected>
              Aurtralia
            </option>
          </select>
        </div>
      </div>
      <hr />

      <div className="purchase_and_sale_price_container dflex">
        <div className="purchase_price width200">
          <label className="font_size">Enter purchase price of Crypto</label>
          <br />
          <input
            type="text"
            className="width200"
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
          />
        </div>
        <div className="sale_price width200">
          <label className="font_size">Enter sale price of Crypto</label>
          <br />
          <input
            type="text"
            className="width200"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
          />
        </div>
      </div>

      <div className="expenses_ans_Investment_type dflex">
        <div className="expenses width200">
          <label className="font_size">Enter your Expenses</label>
          <br />
          <input
            type="text"
            className="width200"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>
        <div className="investment_type width200">
          <label className="font_size">Investment Type</label>
          <br />
          <div
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
            className="btn_group"
          >
            <div className="btn">
              <button
                className={investmentType ? "btnclick" : ""}
                onClick={() => setInvestmentType(true)}
              >
                Short Term
              </button>
              <p style={{ fontSize: "11px", paddingTop: "3px" }}>
                {"<12 months"}
              </p>
            </div>
            <div className="btn">
              <button
                className={investmentType ? "" : "btnclick"}
                onClick={() => setInvestmentType(false)}
              >
                Long Term
              </button>
              <p style={{ fontSize: "11px", paddingTop: "3px" }}>
                {">12 months"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="annual_year_tax_rate dflex">
        <div className="annual_year width200">
          <label className="font_size">Select Your Annual Year</label>
          <br />
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="width200"
          >
            {taxRates.map((val, idx) => (
              <option key={idx} value={val.label}>
                {val.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tax_rate width200">
          <p className="font_size">Tax Rate</p>
          <p className="font_size">{displayText}</p>
        </div>
      </div>

      <div
        className={
          investmentType ? "hide" : "capital_gain_long_term_gains dflex"
        }
      >
        <div className="capital_gains_amount width200">
          <label className="font_size">Capital gains amount</label>
          <br />
          <input
            type="text"
            className="width200"
            value={`$${capitalGainAmt}`}
          />
        </div>
        <div className="long_term_gains width200">
          <label className="font_size">Discount for long term gains</label>
          <br />
          <input
            type="text"
            className="width200"
            value={`$${discountLoenTermGains}`}
          />
        </div>
      </div>

      <div className="final_result dflex">
        <div className="net_capital_gains width200">
          <p className="font_size">Net Capital gains tax amount</p>
          <h3>{`$${netCapitalGains}`}</h3>
        </div>
        <div className="tax_you_need_to_pay width200">
          <p className="font_size">The tax you need to pay*</p>
          <h3>{`$${tax}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default Main;
