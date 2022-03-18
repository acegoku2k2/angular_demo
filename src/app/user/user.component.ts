import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  users = [
    {
      id: 1,
      name: 'tuanna16713',
      age: 20,
      phone: '0332466895',
      avatar: "https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/275364822_1663158190691458_7200549649062622654_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=AggzJJvEJGQAX-IbcMj&_nc_ht=scontent.fhan4-1.fna&oh=00_AT_4yL2_4whvyLrRV5H8uwSKG_-yS_vtePdDoEKbjdpUAQ&oe=622EFC6C"
    },
    {
      id: 2,
      name: 'tuanna16714',
      age: 21,
      phone: '0332466895',
      avatar: "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/275594633_1845969795612299_7915428668853482797_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=XNg_UXiJk_4AX9oM5uD&_nc_ht=scontent-xsp1-1.xx&oh=00_AT_tsBqLuFxWa8fHuzvO6NUrtPOWtJYc3MkswuHg3cgbdA&oe=622F72F8"
    },
    {
      id: 3,
      name: 'tuanna16715',
      age: 22,
      phone: '0332466895',
      avatar: "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/275602209_1162116691223123_476100226343034048_n.jpg?stp=dst-jpg_s960x960&_nc_cat=105&ccb=1-5&_nc_sid=5cd70e&_nc_ohc=vT1EQk3Wg7AAX_tFTan&_nc_ht=scontent-xsp1-1.xx&oh=00_AT-I-8W_jlS5lNfQLc8_SWPpvID40CoMW9-STXjAKn1FUg&oe=622F4FE7"
    },
  ];

  // Định nghĩa 1 mảng trung gian lưu kết quả Search
  // Để không bị ảnh hưởng đến giá trị của mảng users gốc
    usersFilter = this.users;
  // Định nghĩa hàm xóa khi click nút Delete
  remove(userId: number){
    // this.users tương đương thuộc tính users của class User Component
    this.usersFilter = this.usersFilter.filter(function(user){
      return user.id !== userId
    });
  }

  // Mở rộng, cho phép tìm kiếm bằng tiếng việt
  convertVietnameseToUnicode(value: string) {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g');
    return value.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(/\s+/g, '-')
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Định nghĩa hàm Search sau khi nhập vào ô input
  onSearch (event: any){
    // 1. Xử lý việc tìm kiếm chữ hoa chữ thường - đưa cả value và name về dạng chữ thường
    // 2. Khoảng trắng đầu và cuối value của Input - sử dụng phương thức .trim()
    const value = event.target.value;
    const lowerCaseInputValue = value.toLowerCase();
    const lowerCaseTrimInputValue = lowerCaseInputValue.trim();
    const unicodeValue = this.convertVietnameseToUnicode(lowerCaseTrimInputValue);
    // Gắn cho userFilter để không thay đổi users gốc nx
    // Đổi hiển thị danh sách theo usersFilter
    this.usersFilter = this.users.filter(function(user){
      const lowerCaseUserName = user.name.toLowerCase();
      return lowerCaseUserName.indexOf(unicodeValue) !== -1;
    });
  }
  // Thêm mới user
  // b1. Định nghĩa 1 obj newUser trung gian - Nhận giá trị input đầu vào, sau khi submit sẽ gán về giá trị gốc
  newUser = {
    id: 0,
    name: '',
    age: 0,
    phone: '',
    avatar: '',
  };

  onChange(event: any,key: string){
    // this.newUser.id =this.users.length + 1; để lại khi submit mới làm
    // js spread operator
    this.newUser = {
    ...this.newUser,
    [key]: event.target.value //giá trị của key sẽ phải trùng với thuộc tính của obj
    };
    // Nếu key = 'name'
    // this.newUser = {
    //   id: 0,
    //   name: '',
    //   age: 0,
    //   phone: '',
    //   avatar: '',
    //   name: event.target.value // Do sử dụng ... nên name sẽ đc ghi đè
    // };
    console.log(this.newUser);
  }

  onSubmit(){
    // 0.Validate
    if(!this.onValidate(this.newUser)){
      // Thông báo
      return;
    }
    // 1.1. Kiểm tra xem có phải đang sửa không
    if(this.isEdit){
      // Gán giá trị mới cho mảng
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].id === this.newUser.id){
          this.users[i] = this.newUser;
        }
      }
      // Đưa isEdit về giá trị gốc là false để có thế thêm mới
      this.isEdit = false;
    }
    else{
      // 1.2. Gán thêm id bằng độ dài mảng +1
      // this.newUser.id = this.users.length + 1;
      // 2.Push phần tử mới vào mảng users
      this.users.push(this.newUser);
    }

    // 3.Gán lại giá trị gốc cho newUser
    this.newUser = {
      id: 0,
      name: '',
      age: 0,
      phone: '',
      avatar: '',
    };
  }

  onValidate(obj: any){
    // 1 trong số các trường chưa được nhập
    // Hoặc giá trị của age <= 0
    if(!obj.name || !obj.age || obj.age <= '0' || !obj.phone || !obj.avatar){
      // if(obj.name !== '' || obj.age !== '' || obj.age != '0' ............)
        return false;
      }
      return true;
  }

  // Sửa
  // Mặc định sẽ không phải dạng sửa
  isEdit = false;
  onEdit(obj: any){
    // Gắn dữ liệu cần sửa vào newUser
    this.newUser = obj;
    // Chuyển trạng thái đang sửa thành true
    this.isEdit = true;
    // Sau đó sẽ xử lý tiếp ở onSubmit nếu isEdit true

  }
}
