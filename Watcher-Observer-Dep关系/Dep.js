class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  depend() { //dep 关联

  }

  notify() {
    for (const sub of this.subs) {
      sub[i]
    }
  }
}

module.exports = Dep