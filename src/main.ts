function test_function(a: number): void {
    console.log(a);
}

const a = 1;

document.onload = () => {
    test_function(a);
}
