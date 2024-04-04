// greaterThanOrEqualToCurrentDate.validator.ts

import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsGreaterThanOrEqualToCurrentDate(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isGreaterThanOrEqualToCurrentDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return new Date(value) >= new Date();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be greater than or equal to the current date`;
        }
      }
    });
  };
}
