import {useNavigate, useSearchParams} from "react-router-dom";

import "../styles/rates.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {getAccessToken} from "../util/jwtUtil";
export const Rates = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams()
  const [fromCurrency, setFromCurrency] = useState(searchParams.get("fromCurrency") || "USD")
  const [toCurrency, setToCurrency] = useState(searchParams.get("toCurrency") || "EUR")
  const [fromDate, setFromDate] = useState( "2020-06-12")
  const [toDate, setToDate] = useState("2020-06-21")
  const [rates, setRates] = useState([])

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!load) {
      const onPageLoad = async () => {
        await loadPageActions()
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

  const loadPageActions = async () => {
    if(searchParams.get("startDate")) {
      let date = new Date(0);
      date.setUTCSeconds(Number(searchParams.get("startDate")) /1000);
      //console.log(date)
      setFromDate(date.toISOString().split('T')[0])
    }
    if(searchParams.get("endDate")) {
      let date = new Date(0);
      date.setUTCSeconds(Number(searchParams.get("endDate")) / 1000);
      setToDate(date.toISOString().split('T')[0])
    }
    await getRates()
  }

  const getRates = async () => {
    const ratesResponse = await axios.post("api/exchange/time-series", {
      start_date: fromDate,
      end_date: toDate,
      base: fromCurrency,
      symbol: toCurrency,
    }, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    setRates(ratesResponse.data?.rates)
    //console.log(rates)
  }

  const BuildRatesList = () => {
    return Object.keys(rates).map((date) => {
      let rate = rates[date]
      console.log(rate)
      return (
      <li className="rates-item">
        <div className="rate">1{fromCurrency}/{(rate[toCurrency]).toFixed(3)}{toCurrency}</div>
        <p className={"rate-date"}>{date}</p>
        <div className="rate">1{toCurrency}/{(1/rate[toCurrency]).toFixed(3)}{fromCurrency}</div>
      </li>
      )
    })
  }


  return (
    <section className="rates">
      <div className="exchange-content">
        <h3 className="exchange-content-heading">
          Exchange rate dates
        </h3>
        <p className="exchange-content-subheading">
          {fromDate}/{toDate}
        </p>
        <ul className="rates-list">
            {<BuildRatesList/>}
        </ul>
        <button onClick={goBack} className="reset-section-container-form-login button-rates">Go back</button>

      </div>


    </section>
  )
}