import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
// import saveAs from 'save-as'

const tabList = [
  {
    name: "Asset",
    tables: [
      {
        keys: [
          { key: "Asset", value: "Asset" },
          { key: "Value", value: "Value" },
          { key: "Own", value: "Own" },
          { key: "Total", value: "Total" },
        ],
        values: [
          {
            Asset: "Fixed Property (Eg. House)",
            Value: null,
            Own: null,
            Total: null,
          },
          { Asset: "Motor Vehicles", Value: null, Own: null, Total: null },
          { Asset: "Shares", Value: null, Own: null, Total: null },
          { Asset: "Investments", Value: null, Own: null, Total: null },
        ],
      },
    ],
  },
  {
    name: "Income",
    tables: [
      {
        keys: [
          { key: "Deduction", value: "Deduction" },
          { key: "Value", value: "" },
        ],
        values: [
          {
            Deduction: "Tax",
            Value: null,
          },
          {
            Deduction: "UIF",
            Value: null,
          },
          {
            Deduction: "Medical Aid",
            Value: null,
          },
          {
            Deduction: "Pension",
            Value: null,
          },
        ],
      },
      {
        keys: [
          { key: "OtherIncome", value: "Other Income" },
          { key: "Value", value: "" },
        ],
        values: [
          {
            OtherIncome: "Net Salary",
            Value: null,
          },
          {
            OtherIncome: "Other Income",
            Value: null,
          },
          {
            OtherIncome: "Other Income",
            Value: null,
          },
          {
            OtherIncome: "Other Income",
            Value: null,
          },
        ],
      },
    ],
  },
  {
    name: "Expenses",
    tables: [
      {
        keys: [
          { key: "item", value: "Item (Running of Home)" },
          { key: "self", value: "Self (Name)" },
          { key: "Child1", value: "Child(Name)" },
          { key: "Child2", value: "Child(Name)" },
          { key: "Child3", value: "Child(Name)" },
          { key: "Total", value: "Total" },
        ],
        values: [
          {
            item: "Running of Home",
            colSpan: 6,
          },
          {
            item: "Lodging (bond /levy / rent )",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Groceries/food/personal hair, cosmetics",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Toiletries",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Electricity",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Woolies",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Cell Phone",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Electricity",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Nappies and milk",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Credit card",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Clothing",
            colSpan: 6,
          },
          {
            item: "Clothes and shoes (children)",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Work Uniform",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Work Uniform",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Work Uniform",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Work Uniform",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
          {
            item: "Work Uniform",
            self: null,
            Child1: null,
            Child2: null,
            Child3: null,
            Total: null,
          },
        ],
      },
    ],
  },
  {
    name: "Summary",
    tables: [
      {
        keys: [
          { key: "Item", value: "Item" },
          { key: "Amount", value: "Amount" },
          { key: "percentageOfNetIncome", value: "Percentage of Net Income" },
        ],
        values: [
          {
            Item: "Asset",
            Amount: null,
            percentageOfNetIncome: null,
          },
          {
            Item: "Net Income",
            Amount: null,
            percentageOfNetIncome: null,
          },
          {
            Item: "Expenses for Self",
            Amount: null,
            percentageOfNetIncome: null,
          },
          {
            Item: "Expenses for Children",
            Amount: null,
            percentageOfNetIncome: null,
          },
          {
            Item: "Total Expenses",
            Amount: null,
            percentageOfNetIncome: null,
          },
        ],
      },
    ],
  },
];

const CalculatorSection = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [tabIndex, setTabIndex] = useState<Number>(0);
  const [tabData, setTabData] = useState<Array<any>>([...tabList]);
  const [totalAsset, setTotalAsset] = useState(0);
  const [grossSalary, setGrossSalary] = useState(0);
  const [dedutions, setDeductions] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [selfExpenses, setSelfExpenses] = useState(0);
  const [childExpenses, setChildExpenses] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const handleDownload = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(tabData)

    /* var new_workbook = XLSX.utils.book_new();
    // ASSETS
    let assets_column: any = ["Asset", "Value", "Own", "Total"];
    // let assets_data: any = {};
    let assets_data: any = tabData[0].tables[0].value.map((value: any) => {
      let obj
    }); */
    
    /*  var new_workbook = XLSX.utils.book_new();
     tabData.map((data) => {
       let cols: any = []
       data.tables.map((table: any) => {
         table.keys.forEach((key: any) => cols.push(key.key));
         let compatibleData: any = {};
         table.values.forEach((value: any, index: any) => {
           cols.forEach((col: any) => {
             compatibleData[col] = value[col];
           });
         });
         console.log(compatibleData)
         console.log(cols)
         let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
           cols,
         });
         XLSX.utils.book_append_sheet(new_workbook, ws1, data.name);
       })
       // var worksheet = XLSX.utils.aoa_to_sheet(arrayToArray);
       // XLSX.utils.book_append_sheet(new_workbook, worksheet, data.name);
     });
     XLSX.writeFile(new_workbook, `test.xlsx`); */


    const arrayToArray = tabData.map((data) => data.tables);
    const headerTitle = 'Child Support / Maintenance Calculator';
    const sheet = XLSX.utils.json_to_sheet([{}], {
      header: [headerTitle],
    });
    XLSX.utils.sheet_add_json(sheet, arrayToArray, { origin: 'A3' });
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, sheet);
    // console.log("test", arrayToArray);
    /* convert from array of arrays to workbook */
    // var worksheet = XLSX.utils.aoa_to_sheet(arrayToArray);
    // console.log("test1", worksheet);
    
 
    // XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    // var wbout = XLSX.write(new_workbook, {bookType:'xlsx', type:'binary'});
    // console.log("test1", wbout);
    XLSX.writeFile(new_workbook, 'child maintenance calculator.xls');
    // saveAs(new Blob([s2ab(wbout)],{type:"text/plain;charset=utf-8"}), "sheetjs.xlsx");
  };

  /* write workbook (use type 'binary') */


  /* generate a download */
  function s2ab(s: any) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }



  const handleRowAction = (e: any, tabIndex: any, action: String) => {
    e.preventDefault();
    e.stopPropagation();
    const _tabData: any = [...tabData];
    _tabData[tabIndex].tables = tabData[tabIndex].tables.map((table: any) => {
      if (action === "add") {
        const newRow: any = {};
        table.keys.forEach((e: any) => {
          newRow[e.key] = null;
        });
        return {
          ...table,
          values: [...table.values, newRow],
        };
      } else {
        table.values.splice(-1, 1);
        var totalValue = 0;
        for (let index = 0; index < table.values.length; index++) {
          totalValue += table.values[index].Total;
        }
        setTotalAsset(totalValue);
        return table;
      }
    });
    setTabData(_tabData);
  };

  const handleInputAction = (
    e: any,
    tabIndex: any,
    tableIndex: any,
    keyIndex: any,
    valueIndex: any
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const _tabData: any = [...tabData];
    if (tabIndex == 0) {
      _tabData[tabIndex].tables[tableIndex].values[keyIndex][valueIndex] =
        e.target.value;
      _tabData[tabIndex].tables[tableIndex].values[keyIndex].Total =
        _tabData[tabIndex].tables[tableIndex].values[keyIndex].Value -
        _tabData[tabIndex].tables[tableIndex].values[keyIndex].Own;
      var totalValue = 0;
      for (
        let index = 0;
        index < _tabData[tabIndex].tables[tableIndex].values.length;
        index++
      ) {
        totalValue += _tabData[tabIndex].tables[tableIndex].values[index].Total;
      }
      setTotalAsset(totalValue);
      setTabData(_tabData);
    } else if (tabIndex == 1) {
      var deduction = 0;
      var otherIncome = 0;
      if (valueIndex == "GrossSalary") {
        setGrossSalary(e.target.value);
        for (
          let index = 0;
          index < _tabData[tabIndex].tables[tableIndex].values.length;
          index++
        ) {
          deduction +=
            _tabData[tabIndex].tables[tableIndex].values[index].Value;
        }
        _tabData[tabIndex].tables[1].values[0].Value =
          e.target.value - deduction;
      } else if (valueIndex == "Deduction") {
        const _grossSalary: any = grossSalary;
        _tabData[tabIndex].tables[tableIndex].values[keyIndex].Value =
          e.target.value - 0;
        for (
          let index = 0;
          index < _tabData[tabIndex].tables[tableIndex].values.length;
          index++
        ) {
          deduction +=
            _tabData[tabIndex].tables[tableIndex].values[index].Value;
        }
        _tabData[tabIndex].tables[1].values[0].Value = _grossSalary - deduction;
      } else {
        _tabData[tabIndex].tables[tableIndex].values[keyIndex].Value =
          e.target.value - 0;
      }
      deduction = 0;
      for (
        let index = 0;
        index < _tabData[tabIndex].tables[0].values.length;
        index++
      ) {
        deduction += _tabData[tabIndex].tables[0].values[index].Value;
      }
      setDeductions(deduction);
      for (
        let index = 0;
        index < _tabData[tabIndex].tables[1].values.length;
        index++
      ) {
        otherIncome += _tabData[tabIndex].tables[1].values[index].Value;
      }
      setOtherIncome(otherIncome);
      setTotalIncome(otherIncome - deduction);
      setTabData(_tabData);
    } else if (tabIndex == 2) {
      _tabData[tabIndex].tables[tableIndex].values[keyIndex][valueIndex] =
        e.target.value - 0;
      // _tabData[tabIndex].tables[tableIndex].values[keyIndex].Total =
      //   _tabData[tabIndex].tables[tableIndex].values[keyIndex].self +
      //   _tabData[tabIndex].tables[tableIndex].values[keyIndex].Child1 +
      //   _tabData[tabIndex].tables[tableIndex].values[keyIndex].Child2 +
      //   _tabData[tabIndex].tables[tableIndex].values[keyIndex].Child3;
      let totalValue = 0;
      const sumValKeys = Object.keys(
        _tabData[tabIndex].tables[tableIndex].values[keyIndex]
      );
      for (let i = 0; i < sumValKeys.length; i++) {
        if (sumValKeys[i] !== "item" && sumValKeys[i] !== "Total") {
          totalValue +=
            _tabData[tabIndex].tables[tableIndex].values[keyIndex][
            sumValKeys[i]
            ];
        }
      }
      _tabData[tabIndex].tables[tableIndex].values[keyIndex].Total = totalValue;
      var selEexpense = 0;
      for (
        let index = 0;
        index < _tabData[tabIndex].tables[tableIndex].values.length;
        index++
      ) {
        if (
          _tabData[tabIndex].tables[tableIndex].values[index].Total == undefined
        ) {
          continue;
        }
        selEexpense += _tabData[tabIndex].tables[tableIndex].values[index].self;
      }
      setSelfExpenses(selEexpense);
      var expenses = 0;
      for (
        let index = 0;
        index < _tabData[tabIndex].tables[tableIndex].values.length;
        index++
      ) {
        if (
          _tabData[tabIndex].tables[tableIndex].values[index].Total == undefined
        ) {
          continue;
        }
        expenses += _tabData[tabIndex].tables[tableIndex].values[index].Total;
      }
      setTotalExpenses(expenses);
      setChildExpenses(expenses - selEexpense);
      setTabData(_tabData);
    }
  };
  const addChild = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const _tabData = [...tabData];
    const keysArray = _tabData[2].tables[0].keys;
    const valuesArray = _tabData[2].tables[0].values;
    let childKey = `Child${keysArray.length + 3}`;
    const newTabData = keysArray.splice(2, 0, {
      key: `Child${keysArray.length + 3}`,
      value: "Child(Name)",
    });
    const newTabValue = valuesArray.map((value: any) => {
      if (!value.colspan) {
        value[childKey] = null;
      }
      return value;
    });
    setTabData(_tabData);
    console.log("bb", newTabData, newTabValue);
  };
  const childNameChangeHandler = (e: any, event: any) => {
    const { value } = event.target;
    const _tabData: any = [...tabData];
    const myTab = _tabData[2].tables[0].keys.map((tab: any) => {
      if (e.key === tab.key) {
        tab.value = value;
      }
      return tab;
    });
    setTabData(_tabData);
  };
  //yaha se continue krna
  const removeChild = (e: any) => {
    const _tabData: any = [...tabData];
    const valuesArray = _tabData[2].tables[0].values;
    const tabArray = _tabData[2].tables[0].keys;
    for (let i = tabArray.length - 1; i >= 0; i--) {
      if (tabArray[i].key === e.key) {
        tabArray.splice(i, 1);
      }
    }
    for (let i = valuesArray.length - 1; i >= 0; i--) {
      delete valuesArray[i][e.key];
    }
    const myTab = _tabData[2].tables[0].keys.filter(
      (tab: any) => tab.key !== e.key
    );
    const myValue = valuesArray.map((value: any) => {
      if (value.key === e.key) {
        delete value[e.key];
      }
      return value;
    });
    setTabData(_tabData);
    console.log(valuesArray, e);
  };
  console.log("aa", tabData);
  return (
    <Container className="children_calculator">
      <ul className="tabs">
        {tabData.map((tab, index) => (
          <li
            className={`tab-link ${tabIndex === index && "current"}`}
            data-tab={tab.name}
            onClick={() => setTabIndex(index)}
            key={index}
          >
            {tab.name}
          </li>
        ))}
      </ul>

      <div id="Asset" className={`tab-content ${tabIndex === 0 && "current"}`}>
        <div className="table_edit_btn">
          <a
            href="#"
            className="js-add-row"
            onClick={(e) => handleRowAction(e, 0, "add")}
          >
            Add Row
          </a>
          <a
            href="#"
            className="js-del-row"
            onClick={(e) => handleRowAction(e, 0, "remove")}
          >
            Delete Row
          </a>
        </div>
        <div className="asset_calc">
          <table className="table four_tab" id="assetTable">
            <thead>
              <tr>
                {tabData[0].tables[0].keys.map((e: any) => (
                  <th key={e.key}>{e.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabData[0].tables[0].values.map((e: any, index: number) => (
                <tr key={index}>
                  <td>{e.Asset || <input type="text" name="" />}</td>
                  <td>
                    <input
                      type="number"
                      value={e.Value}
                      onChange={(e) =>
                        handleInputAction(e, 0, 0, index, "Value")
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={e.Own}
                      onChange={(e) => handleInputAction(e, 0, 0, index, "Own")}
                    />
                  </td>
                  <td>
                    <input type="number" value={e.Total} readOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Row>
            <Col md={6}>
              <div className="table_data_show">
                <h3>
                  Total Assets<span>R {totalAsset.toFixed(2)}</span>
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <ul className="tabs as_button">
                <li
                  className="tab-link"
                  data-tab="Income"
                  onClick={() => setTabIndex(+tabIndex + 1)}
                >
                  Next
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <div id="Income" className={`tab-content ${tabIndex === 1 && "current"}`}>
        <div className="table_edit_btn">
          <a
            href="#"
            className="js-add-row"
            onClick={(e) => handleRowAction(e, 1, "add")}
          >
            Add Row
          </a>
          <a
            href="#"
            className="js-del-row"
            onClick={(e) => handleRowAction(e, 1, "remove")}
          >
            Delete Row
          </a>
        </div>
        <div className="row gross_salary">
          <div className="col-md-4">
            <div className="table_data_show">
              <h3>Gross Salary </h3>
            </div>
          </div>
          <div className="col-md-8">
            <div className="asset_calc">
              <input
                type="number"
                name=""
                onChange={(e) => handleInputAction(e, 1, 0, 0, "GrossSalary")}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="asset_calc">
              <table className="table two_tab">
                <thead>
                  <tr>
                    {tabData[1].tables[0].keys.map((e: any) => (
                      <th key={e.key}>{e.value}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tabData[1].tables[0].values.map((e: any, index: number) => (
                    <tr key={index}>
                      <td>{e.Deduction || <input type="text" name="" />}</td>
                      <td>
                        <input
                          type="number"
                          value={e.Value}
                          onChange={(event) =>
                            handleInputAction(event, 1, 0, index, "Deduction")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-6">
            <div className="asset_calc">
              <table className="table two_tab">
                <thead>
                  <tr>
                    {tabData[1].tables[1].keys.map((e: any) => (
                      <th key={e.key}>{e.value}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tabData[1].tables[1].values.map((e: any, index: number) => (
                    <tr key={index}>
                      <td>{e.OtherIncome || <input type="text" name="" />}</td>
                      <td>
                        {e.OtherIncome == "Net Salary" ? (
                          <input type="number" value={e.Value} readOnly />
                        ) : (
                          <input
                            type="number"
                            value={e.Value}
                            onChange={(event) =>
                              handleInputAction(
                                event,
                                1,
                                1,
                                index,
                                "OtherIncome"
                              )
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Row>
          <Col md={6}>
            <div className="table_data_show">
              <h3>
                Deductions <span>R {dedutions.toFixed(2)}</span>
              </h3>
              <h3>
                Other Income <span>R {otherIncome.toFixed(2)}</span>
              </h3>
              <h3>
                Total Income <span>R {totalIncome.toFixed(2)}</span>
              </h3>
            </div>
          </Col>
          <Col md={6}>
            <ul className="tabs as_button">
              <li
                className="tab-link"
                data-tab="Expenses"
                onClick={() => setTabIndex(+tabIndex + 1)}
              >
                Next
              </li>
              <li
                className="tab-link"
                data-tab="Asset"
                onClick={() => setTabIndex(+tabIndex - 1)}
              >
                Previous
              </li>
            </ul>
          </Col>
        </Row>
      </div>
      <div
        id="Expenses"
        className={`tab-content ${tabIndex === 2 && "current"}`}
      >
        <div className="table_edit_btn">
          <a
            type="button"
            className="js-add-row"
            onClick={(e) => addChild(e)}
            href="#"
          >
            Add Child
          </a>
          <a
            href="#"
            className="js-add-row"
            onClick={(e) => handleRowAction(e, 2, "add")}
          >
            Add Row
          </a>
          <a
            href="#"
            className="js-del-row"
            onClick={(e) => handleRowAction(e, 2, "remove")}
          >
            Delete Row
          </a>
        </div>
        <div className="asset_calc">
          <table className="table six_tab">
            <thead>
              <tr>
                {tabData[2].tables[0].keys.map((e: any) => {
                  return e.key === "item" ||
                    e.key === "self" ||
                    e.key === "Total" ? (
                    <th key={e.key}>{e.value}</th>
                  ) : (
                    <th key={e.key}>
                      <div style={{ display: "flex" }}>
                        <input
                          value={e.value}
                          onChange={(event) => childNameChangeHandler(e, event)}
                          style={{ color: "white", border: "none" }}
                        />
                        <button
                          style={{ color: "white", background: "red" }}
                          type="button"
                          onClick={() => removeChild(e)}
                        >
                          -
                        </button>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tabData[2].tables[0].values.map((e: any, index: number) => {
                const objectEntries = Object.entries(e);
                return e.colSpan ? (
                  <tr key={index}>
                    <td colSpan={e.colSpan}>
                      <h4>{e.item}</h4>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}>
                    {/* <td>{e.item || <input type="text" name="" />}</td> */}
                    {objectEntries.map((obj) => {
                      return obj[0] === "item" ? (
                        <td>{e.item || <input type="text" name="" />}</td>
                      ) : (
                        obj[0] !== "Total" && (
                          <td>
                            <input
                              type="number"
                              value={e[obj[0]]}
                              onChange={(e) =>
                                handleInputAction(e, 2, 0, index, obj[0])
                              }
                            />
                          </td>
                        )
                      );
                    })}
                    <td>
                      <input type="number" value={e.Total} readOnly />
                    </td>
                    {/* <td>
                      <input
                        type="number"
                        value={e.self}
                        onChange={(e) =>
                          handleInputAction(e, 2, 0, index, "self")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={e.Child1}
                        onChange={(e) =>
                          handleInputAction(e, 2, 0, index, "Child1")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={e.Child2}
                        onChange={(e) =>
                          handleInputAction(e, 2, 0, index, "Child2")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={e.Child3}
                        onChange={(e) =>
                          handleInputAction(e, 2, 0, index, "Child3")
                        }
                      />
                    </td>
                    <td>
                      <input type="number" value={e.Total} readOnly />
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Row>
            <Col md={6}>
              <div className="table_data_show">
                <h3>
                  Total Assets<span>R {totalExpenses.toFixed(2)}</span>
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <ul className="tabs as_button">
                <li
                  className="tab-link"
                  data-tab="Summary"
                  onClick={() => setTabIndex(+tabIndex + 1)}
                >
                  Next
                </li>
                <li
                  className="tab-link"
                  data-tab="Income"
                  onClick={() => setTabIndex(+tabIndex - 1)}
                >
                  Previous
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
      <div
        id="Summary"
        className={`tab-content ${tabIndex === 3 && "current"}`}
      >
        <div className="asset_calc">
          <table className="table four_tab">
            <thead>
              <tr>
                {tabData[3].tables[0].keys.map((e: any) => (
                  <th key={e.key}>{e.value}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Asset</td>
                <td>
                  <input type="text" value={totalAsset} readOnly />
                </td>
                <td>
                  <input type="text" value="" readOnly />
                </td>
              </tr>
              <tr>
                <td>Net Income</td>
                <td>
                  <input type="text" value={totalIncome} readOnly />
                </td>
                <td>
                  <input type="text" value="" readOnly />
                </td>
              </tr>
              <tr>
                <td>Expenses for Self</td>
                <td>
                  <input type="text" value={selfExpenses} readOnly />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      ((selfExpenses * 100) / totalIncome).toFixed(2) +
                      "% (Percentage of Net Income)"
                    }
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>Expenses for Children</td>
                <td>
                  <input type="text" value={childExpenses} readOnly />
                </td>
                <td>
                  <input
                    type="text"
                    value={
                      ((childExpenses * 100) / totalIncome).toFixed(2) +
                      "% (Percentage of Net Income)"
                    }
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>Total Expenses</td>
                <td>
                  <input type="text" value={totalExpenses} readOnly />
                </td>
                <td>
                  <input type="text" value="" readOnly />
                </td>
              </tr>
            </tbody>
          </table>
          <Row>
            <Col md={6}>&nbsp;</Col>
            <Col md={6}>
              <ul className="tabs as_button">
                <li>
                  <a href="#" onClick={handleDownload}>
                    Download In Excel
                  </a>
                </li>
                <li
                  className="tab-link"
                  data-tab="Expenses"
                  onClick={() => setTabIndex(+tabIndex - 1)}
                >
                  Previous
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default CalculatorSection;