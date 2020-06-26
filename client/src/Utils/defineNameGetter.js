export default (arr) => {
    arr.forEach(obj => Object.defineProperty(obj, "fullName", { get: function() { return `${this.name.firstName}  ${this.name.lastName}` }}))
}