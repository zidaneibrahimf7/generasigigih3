// exercise : urutan angka awal 3, 4, 2, 1. buatlah urutan angka tanpa mengubah angka tersebut
// console.log("3")
// console.log("4")
// console.log("2")
// console.log("1")


const order = number => new Promise((resolve) =>
  setTimeout(resolve, number))

order(4000).then(() => console.log("4"));
order(3000).then(() => console.log("3"));
order(2000).then(() => console.log("2"));
console.log("1")

