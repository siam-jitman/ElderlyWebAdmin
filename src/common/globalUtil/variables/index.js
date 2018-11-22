const category = [{
    value: null,
    text: "กรุณาเลือกหมวดหมู่ของเนื้อหา",
    disabled: true
  },
  {
    value: "1",
    text: "แอนิเมชัน (Animation)"
  },
  {
    value: "2",
    text: "การ์ตูน (Cartoon)"
  },
  {
    value: "4",
    text: "หนังสืออิเล็กทรอนิกส์ (Electronic book)"
  },
  {
    value: "5",
    text: "อินโฟกราฟิก (Infographics)"
  },
  {
    value: "6",
    text: "เทคโนโลยีเออาร์ (Augmentation reality technology)"
  },
  {
    value: "7",
    text: "โมชั่นกราฟิก (Motiongraphics)"
  },
  {
    value: "8",
    text: "วีดิทัศน์ (Video)"
  },
  {
    value: "9",
    text: "ภาพมุมมองสามมิติ (3D perspective image)"
  }
]

const activeStatus = [{
  value: "0",
  text: "รอการอนุมัติการเพิ่มข้อมูล"
}, {
  value: "1",
  text: "รอการอนุมัติการแก้ไขข้อมูล"
}, {
  value: "2",
  text: "รอการอนุมัติการลบข้อมูล"
}, {
  value: "3",
  text: "อนุมัติการแสดงข้อมูล"
}]

const message_error = {
  MSG_ERROR_START_DATE_END_DATE_TRANSACTION_LOG: "Start Time must less than End Time.",
  COMMON: {
    MSG_REQUIRED: 'ข้อมูลที่กรอกไม่ถูกต้อง หรือไม่ครบถ้วน',
    MSG_REQUIRED_URL: 'กรุณากรอก Url ให้ถูกต้อง',
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
const message_confirm_header = {
  MSG_CONFIRM_ADD_CONTENT: "ยืนยันการบันทึกข้อมูล"
};

const message_confirm = {
  MSG_CONFIRM_DELETE_MENU_LIST: "Do you want to delete this menu?",
  MSG_CONFIRM_DELETE_CONFIGURATION: "Do you want to delete this configuration?",
  MSG_CONFIRM_DELETE_ADAPTERBOT: "Do you want to delete this bot adapter?",
  MSG_CONFIRM_ADD_CONTENT: "เมื่อบันทึกข้อมูลแล้วจะไม่สามารถแก้ไขได้ จนกว่าผู้ดูแลระบบจะอนุมัติการแสดงข้อมูล"
};

export default {
  CATEGORY: category,
  ACTIVE_STATUS: activeStatus,
  MSG_ERROR: message_error,
  MSG: message_success,
  MSG_CONFIRM: message_confirm,
  MSG_CONFIRM_HEADER: message_confirm_header
}
