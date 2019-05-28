const debug = require('debug')('PhoneBook');

const LogExecTime = require('./LogExecTime').LogExecTime;

class PhoneBook {
  constructor(firstName, lastName, mobile) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobile = mobile;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getMobile() {
    return this.mobile;
  }

  getInfo() {
    return {
      fullName: this.getFullName(),
      mobile: this.getMobile()
    }
  }
}

let pb = new PhoneBook('Jane', 'Doe', '1111');
debug(pb.getFullName());
debug(pb.getInfo());

pb = new LogExecTime(pb);
debug(pb.getFullName());
debug(pb.getInfo());
debug(pb.getMobile());