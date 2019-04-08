function a(A) {
    function b(B) {
        return B + 1
    }

    return b(A)
}

console.log(a(1))
console.log(a.b(1))
