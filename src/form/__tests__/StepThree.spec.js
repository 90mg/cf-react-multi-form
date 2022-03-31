import React from 'react';
import { render, cleanup } from 'react-testing-library';
import StepThree, { extractAvailableDishesByRestaurant, validator } from '../StepThree';
import { dishes } from '../../../public/data/dishes.json';

describe('Selector tests', () => {
  it('Should extract all dishes of restaurant', () => {
    const restaurant = 'Mc Donalds';
    const expected = ['Chicken Burger', 'Ham Burger', 'Cheese Burger', 'Fries', 'Egg Muffin'];
    expect(extractAvailableDishesByRestaurant(restaurant)(dishes)).toEqual(
      expect.arrayContaining(expected),
    );
  });

  it('Should extract all dishes of restaurant', () => {
    const restaurant = 'Olive Garden';
    const expected = ['Garlic Bread', 'Ravioli', 'Rigatoni Spaghetti', 'Fettucine Pasta'];
    expect(extractAvailableDishesByRestaurant(restaurant)(dishes)).toEqual(
      expect.arrayContaining(expected),
    );
  });
});

describe('Validator tests', () => {
  it('Should return object with countAllQuantity when n.o dishes lt n.o person', () => {
    const numberOfPeople = 10;

    expect(
      validator(numberOfPeople)({ dishes: [{ name: 'Wontons', quantity: 9 }] }),
    ).toHaveProperty('countAllQuantity');

    expect(
      validator(numberOfPeople)({
        dishes: [{ name: 'Wontons', quantity: 1 }, { name: 'Garlic Bread', quantity: 3 }],
      }),
    ).toHaveProperty('countAllQuantity');
  });

  it('Should not return object with countAllQuantity when n.o dishes gte n.o person', () => {
    const numberOfPeople = 10;

    expect(
      validator(numberOfPeople)({ dishes: [{ name: 'Wontons', quantity: 10 }] }),
    ).not.toHaveProperty('countAllQuantity');

    expect(
      validator(numberOfPeople)({
        dishes: [{ name: 'Wontons', quantity: 5 }, { name: 'Ravioli', quantity: 5 }],
      }),
    ).not.toHaveProperty('countAllQuantity');

    expect(
      validator(numberOfPeople)({ dishes: [{ name: 'Wontons', quantity: 11 }] }),
    ).not.toHaveProperty('countAllQuantity');

    expect(
      validator(numberOfPeople)({
        dishes: [
          { name: 'Wontons', quantity: 4 },
          { name: 'Mapo Tofu', quantity: 4 },
          { name: 'Seafood Pizza', quantity: 2 },
        ],
      }),
    ).not.toHaveProperty('countAllQuantity');
  });

  it('Should return object with property when dish name is duplicated', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 4 },
        { name: 'Wontons', quantity: 4 },
        { name: 'Seafood Pizza', quantity: 2 },
      ],
    };
    expect(validator(10)(values)).toHaveProperty(['dishes[0].name']);
    expect(validator(10)(values)).toHaveProperty(['dishes[1].name']);
  });

  it('Should not return object with property when dish name is not duplicated', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 4 },
        { name: 'Mapo Tofu', quantity: 4 },
        { name: 'Seafood Pizza', quantity: 2 },
      ],
    };
    expect(validator(10)(values)).not.toHaveProperty(['dishes[0].name']);
    expect(validator(10)(values)).not.toHaveProperty(['dishes[1].name']);
  });

  it('Should return object with property when dish name is empty', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 4 },
        { name: '', quantity: 4 },
        { name: 'Seafood Pizza', quantity: 2 },
      ],
    };
    expect(validator(10)(values)).toHaveProperty(['dishes[1].name']);
  });

  it('Should not return object with property when dish name is empty', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 4 },
        { name: 'Mapo Tofu', quantity: 4 },
        { name: 'Seafood Pizza', quantity: 2 },
      ],
    };
    expect(validator(10)(values)).not.toHaveProperty(['dishes[0].name']);
    expect(validator(10)(values)).not.toHaveProperty(['dishes[1].name']);
    expect(validator(10)(values)).not.toHaveProperty(['dishes[2].name']);
  });

  it('Should return object with property when dish quantity is empty', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: '' },
        { name: 'Mapo Tofu', quantity: 4 },
        { name: 'Seafood Pizza', quantity: '' },
      ],
    };
    expect(validator(10)(values)).toHaveProperty(['dishes[0].quantity']);
    expect(validator(10)(values)).toHaveProperty(['dishes[2].quantity']);
  });

  it('Should return object with property when dish quantity out range 1 ~ 10', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 3 },
        { name: 'Mapo Tofu', quantity: -4 },
        { name: 'Seafood Pizza', quantity: 100 },
      ],
    };
    expect(validator(10)(values)).toHaveProperty(['dishes[1].quantity']);
    expect(validator(10)(values)).toHaveProperty(['dishes[2].quantity']);
  });

  it('Should not return object with property when dish quantity in range 1 ~ 10', () => {
    const values = {
      dishes: [
        { name: 'Wontons', quantity: 1 },
        { name: 'Mapo Tofu', quantity: 4 },
        { name: 'Seafood Pizza', quantity: 10 },
      ],
    };
    expect(validator(10)(values)).not.toHaveProperty(['dishes[0].quantity']);
    expect(validator(10)(values)).not.toHaveProperty(['dishes[1].quantity']);
    expect(validator(10)(values)).not.toHaveProperty(['dishes[2].quantity']);
  });
});

describe('UI tests', () => {
  afterEach(cleanup);

  it('Should have dish name field', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('input[name="dishes[0].quantity"]')).toHaveLength(1);
  });

  it('Should have dish quantity', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('input[name="dishes[0].quantity"]')).toHaveLength(1);
  });

  it('Should have remove dish button', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="remove-dish"]')).toHaveLength(1);
  });

  it('Should have add dish button', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="add-dish"]')).toHaveLength(1);
  });

  it('Should have back button', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="back"]')).toHaveLength(1);
  });

  it('Should have next button', () => {
    const { container } = render(<StepThree fieldData={dishes} />);
    expect(container.querySelectorAll('button[name="next"]')).toHaveLength(1);
  });
});
