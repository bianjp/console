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

import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { AppState } from "../../../../store";
import { setErrorSnackMessage } from "../../../../actions";
import { ISessionResponse } from "../../types";
import { ErrorResponseHandler } from "../../../../common/types";
import TableWrapper from "../../Common/TableWrapper/TableWrapper";
import api from "../../../../common/api";
import AddAccessRuleModal from "./AddAccessRule";
import DeleteAccessRuleModal from "./DeleteAccessRule";
import EditAccessRuleModal from "./EditAccessRule";
import { AddIcon, CreateIcon } from "../../../../icons";
import Grid from "@material-ui/core/Grid";
import {
  actionsTray,
  containerForHeader,
  objectBrowserCommon,
  searchField,
} from "../../Common/FormComponents/common/styleLibrary";

const styles = (theme: Theme) =>
  createStyles({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    paper: {
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },

    addSideBar: {
      width: "320px",
      padding: "20px",
    },
    tableToolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(0),
    },
    minTableHeader: {
      color: "#393939",
      "& tr": {
        "& th": {
          fontWeight: "bold",
        },
      },
    },
    fileName: {
      display: "flex",
      alignItems: "center",
    },
    fileNameText: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    buttonsContainer: {
      "& .MuiButtonBase-root": {
        marginLeft: 10,
      },
    },
    browsePaper: {
      height: "calc(100vh - 280px)",
    },
    "@global": {
      ".rowLine:hover  .iconFileElm": {
        backgroundImage: "url(/images/ob_file_filled.svg)",
      },
      ".rowLine:hover  .iconFolderElm": {
        backgroundImage: "url(/images/ob_folder_filled.svg)",
      },
    },
    listButton: {
      marginLeft: "10px",
      align: "right",
    },
    badgeOverlap: {
      "& .MuiBadge-badge": {
        top: 35,
        right: 10,
      },
    },
    ...actionsTray,
    ...searchField,
    ...objectBrowserCommon,
    ...containerForHeader(theme.spacing(4)),
  });

const mapState = (state: AppState) => ({
  session: state.console.session,
  loadingBucket: state.buckets.bucketDetails.loadingBucket,
});

const connector = connect(mapState, { setErrorSnackMessage });

interface IAccessRuleProps {
  session: ISessionResponse;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  classes: any;
  match: any;
  loadingBucket: boolean;
}

const AccessRule = ({
  classes,
  match,
  setErrorSnackMessage,
  loadingBucket,
}: IAccessRuleProps) => {
  const [loadingAccessRules, setLoadingAccessRules] = useState<boolean>(true);
  const [accessRules, setAccessRules] = useState([]);
  const [addAccessRuleOpen, setAddAccessRuleOpen] = useState<boolean>(false);
  const [deleteAccessRuleOpen, setDeleteAccessRuleOpen] =
    useState<boolean>(false);
  const [accessRuleToDelete, setAccessRuleToDelete] = useState<string>("");
  const [editAccessRuleOpen, setEditAccessRuleOpen] = useState<boolean>(false);
  const [accessRuleToEdit, setAccessRuleToEdit] = useState<string>("");
  const [initialAccess, setInitialAccess] = useState<string>("");

  const bucketName = match.params["bucketName"];

  useEffect(() => {
    if (loadingBucket) {
      setLoadingAccessRules(true);
    }
  }, [loadingBucket, setLoadingAccessRules]);

  const AccessRuleActions = [
    {
      type: "delete",
      onClick: (accessRule: any) => {
        setDeleteAccessRuleOpen(true);
        setAccessRuleToDelete(accessRule.prefix);
      },
    },
    {
      type: "view",
      onClick: (accessRule: any) => {
        setAccessRuleToEdit(accessRule.prefix);
        setInitialAccess(accessRule.access);
        setEditAccessRuleOpen(true);
      },
    },
  ];

  useEffect(() => {
    if (loadingAccessRules) {
      api
        .invoke("GET", `/api/v1/bucket/${bucketName}/access-rules`)
        .then((res: any) => {
          setAccessRules(res.accessRules);
          setLoadingAccessRules(false);
        })
        .catch((err: ErrorResponseHandler) => {
          setErrorSnackMessage(err);
          setLoadingAccessRules(false);
        });
    }
  }, [loadingAccessRules, setErrorSnackMessage, bucketName]);

  const closeAddAccessRuleModal = () => {
    setAddAccessRuleOpen(false);
    setLoadingAccessRules(true);
  };

  const closeDeleteAccessRuleModal = () => {
    setDeleteAccessRuleOpen(false);
    setLoadingAccessRules(true);
  };

  const closeEditAccessRuleModal = () => {
    setEditAccessRuleOpen(false);
    setLoadingAccessRules(true);
  };

  return (
    <Fragment>
      {addAccessRuleOpen && (
        <AddAccessRuleModal
          modalOpen={addAccessRuleOpen}
          onClose={closeAddAccessRuleModal}
          bucket={bucketName}
        />
      )}
      {deleteAccessRuleOpen && (
        <DeleteAccessRuleModal
          modalOpen={deleteAccessRuleOpen}
          onClose={closeDeleteAccessRuleModal}
          bucket={bucketName}
          toDelete={accessRuleToDelete}
        />
      )}
      {editAccessRuleOpen && (
        <EditAccessRuleModal
          modalOpen={editAccessRuleOpen}
          onClose={closeEditAccessRuleModal}
          bucket={bucketName}
          toEdit={accessRuleToEdit}
          initial={initialAccess}
        />
      )}
      <Grid item xs={12} className={classes.actionsTray}>
        <h1 className={classes.sectionTitle}>Access Rules</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component="label"
          onClick={() => {
            setAddAccessRuleOpen(true);
          }}
          className={classes.listButton}
        >
          Add Access Rule
        </Button>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Paper>
        <TableWrapper
          noBackground={true}
          itemActions={AccessRuleActions}
          columns={[
            { label: "Prefix", elementKey: "prefix" },
            { label: "Access", elementKey: "access" },
          ]}
          isLoading={loadingAccessRules}
          records={accessRules}
          entityName="Access Rules"
          idField="prefix"
        />
      </Paper>
    </Fragment>
  );
};

export default withStyles(styles)(connector(AccessRule));
