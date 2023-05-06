import WORK_SAMPLE_DATA from "./data/Climate Risk Rating dataset.json";

import "./App.css";
import Map from "./components/Map";

import { useState, useEffect } from "react";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Table from "./components/Table";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function App() {
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const decadesOptions = [];

  WORK_SAMPLE_DATA.forEach((data) => {
    const have = decadesOptions.find((year) => year === data.Year);
    if (!have) {
      decadesOptions.push(data.Year);
    }
  });

  decadesOptions.sort((a, b) => {
    if (a >= b) {
      return 1;
    } else {
      return -1;
    }
  });

  useEffect(() => {
    setSelectedDecades(decadesOptions);
  }, [WORK_SAMPLE_DATA]);

  useEffect(() => {
    const temp = WORK_SAMPLE_DATA.filter((data) => {
      const match = selectedDecades.find((year) => data.Year === year);
      return match !== undefined;
    });
    setFilterData(temp);
  }, [selectedDecades]);

  return (
    <div>
      <div>
        <Autocomplete
          multiple
          options={decadesOptions}
          disableCloseOnSelect
          value={selectedDecades}
          onChange={(event, value) => {
            setSelectedDecades(value);
          }}
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Decades" />}
        />
      </div>
      <Map filterData={filterData} />
      <Table data={filterData} />
    </div>
  );
}

export default App;
