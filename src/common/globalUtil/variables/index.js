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

const genderMember = [{
    value: null,
    text: "กรุณาเลือกเพศของท่าน",
    disabled: true
  },
  {
    value: "0",
    text: "ชาย"
  },
  {
    value: "1",
    text: "หญิง"
  },
]

const activeSratus = [{
    value: "0",
    text: "รอการอนุมัติ"
  },
  {
    value: "1",
    text: "อนุมัติให้แสดงข้อมูลแล้ว"
  }
];

const message_error = {
  MSG_ERROR_START_DATE_END_DATE_TRANSACTION_LOG: "Start Time must less than End Time.",
  COMMON: {
    MSG_REQUIRED: 'ข้อมูลที่กรอกไม่ถูกต้อง หรือไม่ครบถ้วน',
    MSG_REQUIRED_URL: 'กรุณากรอก Url ให้ถูกต้อง',
    MSG_ERROR_UPLOAD_IMAGE: 'The upload file can be only .jpg and .png',
    MSG_PLEASE_SELECT_ITEM: 'Please select the item that you want.'
  },
  REGISTER: {
    MSG_PASSWORD_NOT_MATCH: 'รหัสที่ระบุไม่ตรงกัน',
  }
};

const message_success = {

}
const message_confirm_header = {
  MSG_CONFIRM_ADD_CONTENT: "ยืนยันการบันทึกข้อมูล",
  MSG_CONFIRM_APPROVE_CONTENT: "ยืนยันอนุมัติให้แสดงข้อมูล"
};

const message_confirm = {
  MSG_CONFIRM_DELETE_MENU_LIST: "Do you want to delete this menu?",
  MSG_CONFIRM_DELETE_CONFIGURATION: "Do you want to delete this configuration?",
  MSG_CONFIRM_DELETE_ADAPTERBOT: "Do you want to delete this bot adapter?",
  MSG_CONFIRM_ADD_CONTENT: "เมื่อบันทึกข้อมูลแล้วจะไม่สามารถแก้ไขได้ จนกว่าผู้ดูแลระบบจะอนุมัติการแสดงข้อมูล",
  MSG_CONFIRM_EDIT_CONTENT: "ต้องการบันทึกข้อมูลจริงหรือไม่",
  MSG_CONFIRM_APPROVE_CONTENT: "เมื่อยืนยันแล้ว ข้อมูลนี้จะถูดแสดงทันที",
  MSG_CONFIRM_APPROVE_CONTENT: "เมื่อยืนยันแล้ว จะไม่สามารถแก้ไขได้",
};

export default {
  GENDER_MEMBER: genderMember,
  CATEGORY: category,
  ACTIVE_STATUS: activeSratus,
  MSG_ERROR: message_error,
  MSG: message_success,
  MSG_CONFIRM: message_confirm,
  MSG_CONFIRM_HEADER: message_confirm_header
}
