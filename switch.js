function greet(name) {
  let message = '';
  switch (name) {
    case 'taro':
      message = 'こんにちは';
      break;
    case 'john':
      message = 'hello';
      break;
    default:
      console.log('登録なし');
      break;
  }
  return message;
}
greet('taro');
greet('john');
greet('pochi');