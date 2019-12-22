import MetadataStorage from "@src/metadata/storage/MetadataStorage";
import TypedClassDecorator from "@src/interfaces/TypedClassDecorator";
import ClassType from "@src/interfaces/ClassType";
import { Nameable, Descriptionable } from "@src/decorators/types";

export interface ObjectTypeOptions extends Nameable, Descriptionable {
  /**
   * An array of `@InterfaceType` classes that the Object Type will implement
   * in the emitted GraphQL schema, e.g.:
   *
   * ```graphql
   * type SampleType implements MyInterface {}
   * ```
   */
  implements?: ClassType | ClassType[];
}

/**
 * Decorator used to register the class as an Object Type in GraphQL schema, e.g.:
 *
 * ```graphql
 * type MyClass {
 *  myProperty: SomeType!
 * }
 * ```
 */
export default function ObjectType(
  options: ObjectTypeOptions = {},
): TypedClassDecorator {
  const implementedInterfaceClasses: ClassType[] = [];
  if (options.implements) {
    implementedInterfaceClasses.concat(options.implements);
  }

  return target => {
    MetadataStorage.get().collectObjectTypeMetadata({
      target,
      schemaName: options.schemaName ?? target.name,
      description: options.description,
      implementedInterfaceClasses,
    });
  };
}