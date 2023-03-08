import "../styles/user-profile.css"
import "../styles/short-url.css"
import "../styles/main-page.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getAccessToken} from "../util/jwtUtil";

export const Exchange = () => {

  const [load, setLoad] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('AED')
  const [toCurrency, setToCurrency] = useState('AED')
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [currencyData, setCurrencyData] = useState([])
  const [fromValueMain, setFromValueMain] = useState(0)
  const [toValueMain, setToValueMain] = useState(0)

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
    const currencies = (await axios.get("api/exchange/currencies", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })).data.currencies;

    console.log(currencies)

    setCurrencyData(currencies.map((currency) => {
      return {text: currency.name, value: currency.code}
    }))
  }

  const buildCurrencySelectList = (keyid) => {
    if(load === false) return (<option>Loading...</option>)
    return currencyData.map((currency) => {
      return (
        <option className={"dropdown-item"} key={`${currency.value}-key-${keyid}`}>{currency.value}</option>
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
    onFromValueChange({target: {value: fromValueMain}})
  }

  const onFromValueChange = (e) => {
    setFromValue(e.target.value)
    if (isNaN(e.target.value)) {
      return
    }
    let val = Number(e.target.value)
    setFromValueMain(val)
    setToValue(Number((val * exchangeRate).toFixed(1)))
    setToValueMain(val * exchangeRate)
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
                {buildCurrencySelectList(0)}
              </select>
              <div id="exchange-from-result" className="exchange-result">
                <span className="exchange-result-currency">{fromCurrency}</span>
                <input type="text" className="currency-input" value={fromValue} placeholder="0"
                       onChange={onFromValueChange}/>
              </div>
            </div>

            <div className="exchange-form-column ">
                        <span className="select-name">
                            To
                        </span>
              <select id="exchange-to" className="show dropdown-menu dropdown-menu-dark exchange-select-to"
                      onChange={onToCurrencyChange}>
                {buildCurrencySelectList(1)}
              </select>
              <div id="exchange-to-result" className="exchange-result">
                <input type="text" className="currency-input text-sm-end" placeholder="0" value={toValue}/>
                <span className="exchange-result-currency">{toCurrency}</span>
              </div>

            </div>

          </div>
          <div className="rate-mid">
            {fromValueMain.toFixed(3)}{fromCurrency}/{toValueMain.toFixed(3)}{toCurrency}</div>

          <div className="form-footer">
            <div className="rate">1{fromCurrency}/{exchangeRate.toFixed(3)}{toCurrency}</div>
            <Link to="/exchange-better"
                  className="reset-section-container-form-login">Past Dates</Link>
            <div className="rate">1{toCurrency}/{(1 / exchangeRate).toFixed(3)}{fromCurrency}</div>
          </div>
        </form>
      </div>

    </section>
  )
}