import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import {getAccessToken} from "../util/jwtUtil";
import "react-datepicker/dist/react-datepicker.css";

import "../styles/user-profile.css"
import "../styles/short-url.css"
import "../styles/main-page.css"

export const ExchangeBetter = () => {

  const [load, setLoad] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [currencyData, setCurrencyData] = useState([])
  const [fromValueMain, setFromValueMain] = useState(0)
  const [toValueMain, setToValueMain] = useState(0)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!load) {
      const onPageLoad = async () => {
        await loadCurrencies()
        setLoad(true);
      }
      if (document.readyState === 'complete') {
        onPageLoad();
      } else {
        window.addEventListener('load', onPageLoad);
        return () => window.removeEventListener('load', onPageLoad);
      }
    }
  })

  const loadCurrencies = async () => {
    setCurrencyData([
      {text: 'American Dollar', value: 'USD'},
      {text: 'Euro', value: 'EUR'},
      {text: 'British Pound', value: 'GBP'},
    ])
  }

  const buildCurrencySelectList = () => {
    return currencyData.map((currency) => {
      return (
        <option className={"dropdown-item"} key={`${currency.value}-key`}>{currency.value}</option>
      )
    })
  }

  const onFromCurrencyChange = async (e) => {
    await setFromCurrency(e.target.value)
    await onCurrencyChange(e.target.value, toCurrency)
  }

  const onToCurrencyChange = async (e) => {
    await setToCurrency(e.target.value)
    await onCurrencyChange(fromCurrency, e.target.value)
  }

  const onCurrencyChange = async (from, to) => {
    const excRate = await axios.get("api/exchange/latest", {
      params: {
        base: from,
        symbol: to,
      },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    console.log(excRate)
    console.log(excRate.data.rates[to])
    setExchangeRate(excRate.data.rates[to])
  }

  const onFromValueChange = (e) => {
    setFromValue(e.target.value)
    if (isNaN(e.target.value)) {
      return
    }
    let val = Number(e.target.value)
    setFromValueMain(val)
    setToValueMain(val * exchangeRate)
  }

  const onToValueChange = (e) => {
    setToValue(e.target.value)
    if (isNaN(e.target.value)) {
      return
    }
    let val = Number(e.target.value)
    setToValueMain(val)
    if (exchangeRate === 0) {
      setFromValueMain(0)
      return
    }
    setFromValueMain(val / exchangeRate)
  }

  return (
    <section className="exchange">
      <div className="exchange-content">
        <h3 className="exchange-content-heading">
          Exchange money
        </h3>
        <form action="" className="exchange-form">

          <div className="form-columns">

            <div className="exchange-form-column">
                        <span className="select-name">
                            From
                        </span>
              <select id="exchange-from" className="show dropdown-menu dropdown-menu-dark"
                      onChange={onFromCurrencyChange}>
                {buildCurrencySelectList()}
              </select>
              <div id="exchange-from-result" className="exchange-result">
                <span className="exchange-result-currency">{fromCurrency}</span>
                <input type="text" className="currency-input" value={fromValue} placeholder="0"
                       onChange={onFromValueChange}/>
              </div>
              <div className="datepicker-wrapper">
                <span className="select-name">
                                To
                            </span>
                <DatePicker className="datepicker-input" selected={startDate} onChange={(date) => setStartDate(date)}
                            dateFormat="dd-MMM-yyyy"/>
              </div>
            </div>

            <div className="exchange-form-column ">
              <span className="select-name">
                            To
                        </span>
              <select id="exchange-to" className="show dropdown-menu dropdown-menu-dark exchange-select-to"
                      onChange={onToCurrencyChange}>
                {buildCurrencySelectList()}
              </select>
              <div id="exchange-to-result" className="exchange-result">
                <input type="text" className="currency-input text-sm-end" placeholder="0" value={toValue}
                       onChange={onToValueChange}/>
                <span className="exchange-result-currency">{toCurrency}</span>
              </div>
              <div className="datepicker-wrapper">
                <span className="select-name">
                                To
                            </span>
                <DatePicker className="datepicker-input" selected={endDate} onChange={(date) => setEndDate(date)}
                            dateFormat="dd-MMM-yyyy"/>
              </div>
              <div className="exchange-content-heading exchange-content-heading-absolute">Exchange Rate Date</div>

            </div>

          </div>
          <div className="form-footer">
            <div className="rate">1{fromCurrency}/{exchangeRate.toFixed(3)}{toCurrency}</div>
            <Link
              type="submit"
              className="reset-section-container-form-login"
              to={`/rates?startDate=${Date.parse(startDate)}&endDate=${Date.parse(endDate)}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`}
            >
              Exchange
            </Link>
            <div className="rate">1{toCurrency}/{(1 / exchangeRate).toFixed(3)}{fromCurrency}</div>
          </div>
        </form>
      </div>

    </section>
  )
}
