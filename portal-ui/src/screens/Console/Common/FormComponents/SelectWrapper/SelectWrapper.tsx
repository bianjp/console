// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputBase,
  Tooltip,
} from "@material-ui/core";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";
import HelpIcon from "../../../../../icons/HelpIcon";

export interface selectorTypes {
  label: string;
  value: string;
}

interface SelectProps {
  options: selectorTypes[];
  value: string;
  label: string;
  id: string;
  name: string;
  tooltip?: string;
  onChange: (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  disabled?: boolean;
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    ...fieldBasic,
    ...tooltipHelper,
  });

const SelectStyled = withStyles((theme: Theme) =>
  createStyles({
    root: {
      lineHeight: 1,
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      position: "relative",
      color: "#393939",
      fontSize: 13,
      fontWeight: 600,
      padding: "15px 20px 10px 10px",
      borderBottom: "1px solid #9c9c9c",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        borderColor: "#393939",
      },
      "&:focus": {
        backgroundColor: "#fff",
      },
    },
  })
)(InputBase);

const SelectWrapper = ({
  classes,
  id,
  name,
  onChange,
  options,
  label,
  tooltip = "",
  value,
  disabled = false,
}: SelectProps) => {
  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.fieldContainer}>
        {label !== "" && (
          <InputLabel htmlFor={id} className={classes.inputLabel}>
            <span>{label}</span>
            {tooltip !== "" && (
              <div className={classes.tooltipContainer}>
                <Tooltip title={tooltip} placement="top-start">
                  <div>
                    <HelpIcon className={classes.tooltip} />
                  </div>
                </Tooltip>
              </div>
            )}
          </InputLabel>
        )}
        <FormControl fullWidth>
          <Select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            input={<SelectStyled />}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem
                value={option.value}
                key={`select-${name}-${option.label}`}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(SelectWrapper);
