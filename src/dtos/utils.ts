import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsArrayOfStringsOrNumbers(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfStringsOrNumbers',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) {
            return false;
          }
          // Check if all elements in the array are either strings or numbers
          const isNumber = value.every((item) => typeof item === 'number');

          const isString = value.every((item) => typeof item === 'string');

          return isNumber || isString;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of only strings or only numbers.`;
        },
      },
    });
  };
}
