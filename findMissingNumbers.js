// Для решения этой задачи я решил использовать коллекцию Set
// Создаем коллекцию Set из исходного массива arr
// Set будем использовать для проверки наличия пропущенного числа в массиве

// Сложность алгоритма
// Set понижает сложность алгоритма. Например, поиск элемента в коллекции Set методом has имеет сложность O(1).
// А если бы использовали сначала сортировку массива через sort, а затем в цикле for метод includes, то сложность могла возрасти вообще до O(n*log(n)).

// Инциализируются константы с текстом, который будет выводиться в консоль
const NOT_ARRAY = "Input is not an array";
const NON_NUMERIC_VALUES_IN_ARRAY = "There are non-numeric values in the array";
const EMPTY_ARRAY = "The array is empty";
const ONE_NUMBER_ARRAY = "There is one number in the array";
const NO_MISSING_NUMBERS = "There are no missing numbers";

const findMissingNumber = (arr) => {
  if (!Array.isArray(arr)) return NOT_ARRAY; // Проверяем, что передан массив, иначе возвращаем ошибку
  if (arr.length === 0) return EMPTY_ARRAY; // Проверяем, что переданный массив не пустой, иначе возвращаем ошибку
  if (arr.length === 1) return ONE_NUMBER_ARRAY; // Проверяем, что переданный массив не состоит из одного числа, иначе возвращаем ошибку
  if (
    arr.some(
      (num) =>
        typeof num !== "number" || !Number.isFinite(num) || Number.isNaN(num)
    )
  )
    return NON_NUMERIC_VALUES_IN_ARRAY; // Проверяем, что переданный массив содержит только числа, отсеиваем Infinity и NaN, иначе возвращаем ошибку

  let numSet = new Set(arr); // Создаем Set из исходного массива
  let min = Math.min(...arr); // Находим минимальное значение в массиве
  let max = Math.max(...arr); // Находим максимальное значение в массиве

  if (min === max) return NO_MISSING_NUMBERS; // Проверяем, если минимальное и максимальное значения совпадают, значит, все числа в массиве присутствуют, и возвращается сообщение NO_MISSING_NUMBERS

  // Запускаем цикл от минимального до максимального значения включительно
  // Проверяем в Set методом has, есть ли пропущенные числа, и если есть, то возвращаем значение
  for (let i = min; i <= max; i++) {
    if (!numSet.has(i)) return i;
  }

  return NO_MISSING_NUMBERS; // В противном случае возвращается сообщение, что все числа присутствуют в массиве
};

// Создадим функцию test, которая будет выводить в консоль результат выполнения функции findMissingNumber и заранее известный ожидаемый результат
// В этой функции проверим на известные краевые случаи, когда нет пропущенных чисел, массив пустой, в массиве есть не числовые значения, или в функцию передается не массив

const test = () => {
  // Создаем массив с объектами, где arg - входные данные для функции findMissingNumber, а expected - ожидаемый результат
  const testCases = [
    { arg: [5, 6, 8], expected: 7 },
    { arg: [6, 8], expected: 5 },
    { arg: [5, 7, 9], expected: 6 },
    { arg: [0, 1, 2, 3, 5], expected: 4 },
    { arg: [-2, 2], expected: -1 },
    { arg: "string", expected: NOT_ARRAY },
    { arg: {}, expected: NOT_ARRAY },
    { arg: NaN, expected: NOT_ARRAY },
    { arg: [], expected: EMPTY_ARRAY },
    { arg: [5], expected: ONE_NUMBER_ARRAY },
    { arg: [5, "a", 7], expected: NON_NUMERIC_VALUES_IN_ARRAY },
    { arg: [5, 5], expected: NO_MISSING_NUMBERS },
    { arg: [5, 6], expected: NO_MISSING_NUMBERS },
    { arg: [-2, -1, 0, 1, 1, 1, 2, 3], expected: NO_MISSING_NUMBERS },
    { arg: [-Infinity, Infinity], expected: NON_NUMERIC_VALUES_IN_ARRAY },
    { arg: [0, 1, 2, 3, Infinity], expected: NON_NUMERIC_VALUES_IN_ARRAY },
    { arg: [1, 2, NaN], expected: NON_NUMERIC_VALUES_IN_ARRAY },
  ];

  // В цикле forEach проходимся по тест кейсам, выводим в консоль сообщение с фактическим результатом и ожидаемым результатом
  testCases.forEach(({ arg, expected }) => {
    const result = findMissingNumber(arg);
    const message = `Expected: ${expected}, Got: ${result}`;
    console.log(message);
  });
};

// Запускаем тесты
test(); 


// Еще один тест на производительность для оценки эффективности функции
// Создаем большой тестовый массив testArr из 5000 уникальных чисел, случайно распределённых между -5000 и 5000
// Удаляем из него случайный элемент по индексу, который генерируется рандомно
// Тестируем производительность функции findMissingNumber, которая должна найти удалённое число

// Определяем границы случайных чисел
// Объявляем константы со значениями от -5000 до 5000
// Определяем длину массива 5000
const MIN_RANDOM_VALUE = -5000;
const MAX_RANDOM_VALUE = 5000;
const ARRAY_LENGTH = 5000;

// Объявляем тестовый массив testArr, в который будет
const testArr = [];

// Генерируем случайное число
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Объявляем константу индекса для удаления, в которою будет записываться рандомное число
const INDEX_TO_REMOVE = generateRandomInt(0, ARRAY_LENGTH - 2);

// Функция принимает функцию для тестирования, аргумент для передачи в эту функцию и ожидаемый результат
// Затем функция измеряет время выполнения функции и сравнивает полученный результат с ожидаемым
function testPerfomance(func, arg, expected) {
  const startTime = performance.now();
  const result = func(arg);
  const endTime = performance.now();
  const timeSpent = `${endTime - startTime}ms`;
  if (result === expected) {
    return `Test passed. Time: ${timeSpent}`;
  }
  return `Test failed.
Actual output: ${result}
Expected: ${expected}
Time: ${timeSpent}
`;
}

// Создаем еще одну константу, в которую добавляем сгенерированное рандомно число от MIN_RANDOM_VALUE до MAX_RANDOM_VALUE
const randomStartPoint = generateRandomInt(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE);

// Заполняем тестовый массив числами
for (let i = 0; i < ARRAY_LENGTH; i++) {
  testArr.push(randomStartPoint + i);
}

// Удаляем элемент из массива по индексу INDEX_TO_REMOVE с помощью метода splice
// Значение удалённого элемента сохраняется в переменной expResult
const expResult = testArr.splice(INDEX_TO_REMOVE, 1)[0];

// Запускаем и тестируем производительность
testPerfomance(findMissingNumber, testArr, expResult);
