import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

/*
Cell:
tableName
fieldName
pkID
selected

Record:
tableName
pkID
selectedCell

Grid:
tableName
schema
data
selectedCell

insert()
delete()
update()
*/

//e.g. this.props.schema
const exampleTableSchema = {
  "type": "statement",
  "name": {
    "type": "identifier",
    "variant": "table",
    "name": "tracks"
  },
  "variant": "create",
  "format": "table",
  "definition": [
    {
      "type": "definition",
      "variant": "column",
      "name": "TrackId",
      "definition": [
        {
          "type": "constraint",
          "variant": "not null"
        },
        {
          "type": "constraint",
          "variant": "primary key",
          "autoIncrement": true
        }
      ],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "Name",
      "definition": [
        {
          "type": "constraint",
          "variant": "not null"
        }
      ],
      "datatype": {
        "type": "datatype",
        "variant": "nvarchar",
        "affinity": "text",
        "args": {
          "type": "expression",
          "variant": "list",
          "expression": [
            {
              "type": "literal",
              "variant": "decimal",
              "value": "200"
            }
          ]
        }
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "AlbumId",
      "definition": [],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "MediaTypeId",
      "definition": [
        {
          "type": "constraint",
          "variant": "not null"
        }
      ],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "GenreId",
      "definition": [],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "Composer",
      "definition": [],
      "datatype": {
        "type": "datatype",
        "variant": "nvarchar",
        "affinity": "text",
        "args": {
          "type": "expression",
          "variant": "list",
          "expression": [
            {
              "type": "literal",
              "variant": "decimal",
              "value": "220"
            }
          ]
        }
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "Milliseconds",
      "definition": [
        {
          "type": "constraint",
          "variant": "not null"
        }
      ],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "Bytes",
      "definition": [],
      "datatype": {
        "type": "datatype",
        "variant": "integer",
        "affinity": "integer"
      }
    },
    {
      "type": "definition",
      "variant": "column",
      "name": "UnitPrice",
      "definition": [
        {
          "type": "constraint",
          "variant": "not null"
        }
      ],
      "datatype": {
        "type": "datatype",
        "variant": "numeric",
        "affinity": "numeric",
        "args": {
          "type": "expression",
          "variant": "list",
          "expression": [
            {
              "type": "literal",
              "variant": "decimal",
              "value": "10"
            },
            {
              "type": "literal",
              "variant": "decimal",
              "value": "2"
            }
          ]
        }
      }
    },

    {
      "type": "definition",
      "variant": "constraint",
      "definition": [
        {
          "type": "constraint",
          "variant": "foreign key",
          "references": {
            "type": "identifier",
            "variant": "expression",
            "format": "table",
            "name": "albums",
            "columns": [
              {
                "type": "identifier",
                "variant": "column",
                "name": "AlbumId"
              }
            ]
          },
          "action": [
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            },
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            }
          ]
        }
      ],
      "columns": [
        {
          "type": "identifier",
          "variant": "column",
          "name": "AlbumId"
        }
      ]
    },
    {
      "type": "definition",
      "variant": "constraint",
      "definition": [
        {
          "type": "constraint",
          "variant": "foreign key",
          "references": {
            "type": "identifier",
            "variant": "expression",
            "format": "table",
            "name": "genres",
            "columns": [
              {
                "type": "identifier",
                "variant": "column",
                "name": "GenreId"
              }
            ]
          },
          "action": [
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            },
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            }
          ]
        }
      ],
      "columns": [
        {
          "type": "identifier",
          "variant": "column",
          "name": "GenreId"
        }
      ]
    },
    {
      "type": "definition",
      "variant": "constraint",
      "definition": [
        {
          "type": "constraint",
          "variant": "foreign key",
          "references": {
            "type": "identifier",
            "variant": "expression",
            "format": "table",
            "name": "media_types",
            "columns": [
              {
                "type": "identifier",
                "variant": "column",
                "name": "MediaTypeId"
              }
            ]
          },
          "action": [
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            },
            {
              "type": "action",
              "variant": "on",
              "action": "no action"
            }
          ]
        }
      ],
      "columns": [
        {
          "type": "identifier",
          "variant": "column",
          "name": "MediaTypeId"
        }
      ]
    }
  ]
};

//e.g. this.state.data
const exampleTableData = [
  { TrackId: 1,
    Name: 'For Those About To Rock (We Salute You)',
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 343719,
    Bytes: 11170334,
    UnitPrice: 0.99 },
  { TrackId: 2,
    Name: 'Balls to the Wall',
    AlbumId: 2,
    MediaTypeId: 2,
    GenreId: 1,
    Composer: null,
    Milliseconds: 342562,
    Bytes: 5510424,
    UnitPrice: 0.99 },
  { TrackId: 3,
    Name: 'Fast As a Shark',
    AlbumId: 3,
    MediaTypeId: 2,
    GenreId: 1,
    Composer: 'F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman',
    Milliseconds: 230619,
    Bytes: 3990994,
    UnitPrice: 0.99 },
  { TrackId: 4,
    Name: 'Restless and Wild',
    AlbumId: 3,
    MediaTypeId: 2,
    GenreId: 1,
    Composer:
     'F. Baltes, R.A. Smith-Diesel, S. Kaufman, U. Dirkscneider & W. Hoffman',
    Milliseconds: 252051,
    Bytes: 4331779,
    UnitPrice: 0.99 },
  { TrackId: 5,
    Name: 'Princess of the Dawn',
    AlbumId: 3,
    MediaTypeId: 2,
    GenreId: 1,
    Composer: 'Deaffy & R.A. Smith-Diesel',
    Milliseconds: 375418,
    Bytes: 6290521,
    UnitPrice: 0.99 },
  { TrackId: 6,
    Name: 'Put The Finger On You',
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 205662,
    Bytes: 6713451,
    UnitPrice: 0.99 },
  { TrackId: 7,
    Name: "Let's Get It Up",
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 233926,
    Bytes: 7636561,
    UnitPrice: 0.99 },
  { TrackId: 8,
    Name: 'Inject The Venom',
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 210834,
    Bytes: 6852860,
    UnitPrice: 0.99 },
  { TrackId: 9,
    Name: 'Snowballed',
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 203102,
    Bytes: 6599424,
    UnitPrice: 0.99 },
  { TrackId: 10,
    Name: 'Evil Walks',
    AlbumId: 1,
    MediaTypeId: 1,
    GenreId: 1,
    Composer: 'Angus Young, Malcolm Young, Brian Johnson',
    Milliseconds: 263497,
    Bytes: 8611245,
    UnitPrice: 0.99 }
  ];

class Grid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: exampleTableData,
      selectedCell: null
    };
    this.selectCell = this.selectCell.bind(this);
    this.changeCell = this.changeCell.bind(this);
  }

  selectCell(fieldName, pkID){
    this.setState({selectedCell: {fieldName: fieldName, pkID: pkID}});
  }

  changeCell(fieldName, pkID, value){
    this.setState((state, props) => {
      let newdata = JSON.parse(JSON.stringify(state.data));

      newdata.find(element => {
        return element["TrackId"] === pkID
      })[fieldName] = value;;

      return {data: newdata};
    });
  }

  render(){
    return (
      <table className="table table-bordered">
        <thead className="thead-dark"><Header schema={this.props.schema}/></thead>
        <tbody>
          {this.state.data.map((record, index) =>
            <Row key={index} record={record} schema={this.props.schema} selectCell={this.selectCell} changeCell={this.changeCell} selectedCell={this.state.selectedCell ? (record["TrackId"] === this.state.selectedCell.pkID ? this.state.selectedCell.fieldName : null) : null}/>
          )}
        </tbody>
      </table>
    );
  }
}

function Row(props){
  let columns = props.schema.definition.filter(stm => stm.variant === "column");
  return(
    <tr>
      {columns.map((col, index) => <Cell key={index} selected={props.selectedCell === col.name} value={props.record[col.name]} fieldName={col.name} pkId={props.record.TrackId} selectCell={props.selectCell} changeCell={props.changeCell}/>)}
    </tr>
  );

}

function Cell(props){
  function selectCell(e){
    props.selectCell(props.fieldName, props.pkId);
  }

  function changeCell(e){
    props.changeCell(props.fieldName, props.pkId, e.target.value);
  }

  return(
    <td onClick={selectCell} className="p-0">
      {props.selected ? <textarea className="form-control rounded-0 py-0 px-2 w-100" rows={1} value={props.value ? props.value : ""} onChange={changeCell}/> : <span className="px-2">{props.value}</span>}
    </td>
  )
}

function Header(props){
  let columns = props.schema.definition.filter(stm => stm.variant === "column");
  return(
    <tr>
      {columns.map((col, index) => <th key={index}>{col.name.toString()}</th>)}
    </tr>
  );
}

class App extends Component {
  render() {
    return (
      <Grid schema={exampleTableSchema}/>
    );
  }
}

export default App;

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
