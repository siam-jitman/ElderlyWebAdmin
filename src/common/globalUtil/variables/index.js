const listStory_fields = [{
    label: " ",
    key: "checkList",
    class: "chk"
  },
  {
    label: " ",
    key: "viewStory",
    class: "chk"
  },
  {
    label: "Storyboard Name",
    key: "storyName",
    class: "storyName",
    sortable: true
  },
  {
    label: "Remark",
    key: "remark"
  },
  {
    label: "Last Updated",
    key: "lastUpdate",
    class: "last"
  },
  {
    label: "Last Publish",
    key: "lastPublish",
    class: "last"
  }
  // ,
  // {
  //   label: "Status",
  //   key: "status",
  //   class: "status"
  // }
  // ,
  // {
  //   label: " ",
  //   key: "ready",
  //   class: "ready p-tb"
  // }
  ,
  {
    label: "Delete",
    key: "delete",
    class: "tdDelete"
  }
];

const listScreen_fields = [{
    label: " ",
    key: "checkList",
    class: "chk"
  },
  {
    label: " ",
    key: "viewScreen",
    class: "chk"
  },
  {
    label: "Storyboard Name",
    key: "storyName",
    class: "storyName",
    sortable: true
  },
  {
    label: "Remark",
    key: "remark"
  }
];

const listApplication_fields = [{
    label: " ",
    key: "view",
    class: "chk"
  },
  {
    label: "Application Name",
    key: "entityName",
    class: "storyName"
  },
  {
    label: "Story Name",
    key: "storyName",
    class: "storyName"
  },
  {
    label: "Last Updated",
    key: "lastUpdate",
    class: "last"
  },
  {
    label: "Version",
    key: "version",
    class: "status"
  },
  {
    label: "Last Publish",
    key: "lastPublish",
    class: "last"
  },
  {
    label: "Status",
    key: "status",
    class: "status"
  },
  {
    label: "Publish Status",
    key: "publishStatus",
    class: "last"
  }
];

const message_error = {
  MSG_ERROR_START_DATE_END_DATE_TRANSACTION_LOG: "Start Time must less than End Time.",
  COMMON: {
    MSG_REQUIRED: 'Please fill in all input.',
    MSG_ERROR_UPLOAD_IMAGE: 'The upload file can be only .jpg and .png',
    MSG_PLEASE_SELECT_ITEM: 'Please select the item that you want.'
  },
  BOT_CONFIG: {
    MSG_REQUIRED_MENU: 'Please input at least 1 menu.',
  }
};

const message_success = {
  MSG_UPDATE_PASSWORD_SUCCESS: 'Password Updated.'
}

const message_confirm = {
  MSG_CONFIRM_DELETE_MENU_LIST: "Do you want to delete this menu?",
  MSG_CONFIRM_DELETE_CONFIGURATION: "Do you want to delete this configuration?",
  MSG_CONFIRM_DELETE_ADAPTERBOT: "Do you want to delete this bot adapter?"
};

export default {
  listStory_fields: listStory_fields,
  listScreen_fields: listScreen_fields,
  listApplication_fields: listApplication_fields,
  isCollapseTransactionServiceGateway: true,
  isCollapseTransactionDMA: true,
  MSG_ERROR: message_error,
  MSG: message_success,
  MSG_CONFIRM: message_confirm
}
