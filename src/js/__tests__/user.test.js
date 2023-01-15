import { loadUser } from '../user';
import { httpGet } from '../http';
import { healthPerson, healthSortPersons } from '../health';
jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call loadUser once', () => {
  httpGet.mockReturnValue(JSON.stringify({}));

  const response = loadUser(1);
  expect(response).toEqual({});
  expect(httpGet).toBeCalledWith('http://server:8080/users/1');
});

test.each([
  [
    {name: 'Маг', health: 90},
    'healthy'
  ],
  [
    {name: 'Маг', health: 50},
    'wounded'
  ],
  [
    {name: 'Маг', health: 45},
    'wounded'
  ],
  [
    {name: 'Маг', health: 15},
    'wounded'
  ],
  [
    {name: 'Маг', health: 14},
    'critical'
  ],
])('person health display', (input, result) => {
    expect(healthPerson(input)).toBe(result);
});

test('desc sortable persons for health', () => {
  expect(healthSortPersons([
    {name: 'мечник', health: 10},
    {name: 'маг', health: 100},
    {name: 'лучник', health: 80},
  ])).toEqual([
    {name: 'маг', health: 100},
    {name: 'лучник', health: 80},
    {name: 'мечник', health: 10},
  ]);
});