import { GraphQLScalarType } from "graphql";
import { ValidatorOptions } from "class-validator";

import { AuthChecker } from "../types/auth-checker";

export type DateScalarMode = "isoDate" | "timestamp";

export interface ScalarsTypeMap {
  type: Function;
  scalar: GraphQLScalarType;
}

export interface BuildContextOptions {
  dateScalarMode?: DateScalarMode;
  scalarsMap?: ScalarsTypeMap[];
  /**
   * Indicates if class-validator should be used to auto validate objects injected into params.
   * You can also directly pass validator options to enable validator with a given options.
   */
  validate?: boolean | ValidatorOptions;
  authChecker?: AuthChecker;
}

export abstract class BuildContext {
  static dateScalarMode: DateScalarMode;
  static scalarsMaps: ScalarsTypeMap[];
  static validate: boolean | ValidatorOptions;
  static authChecker?: AuthChecker<any>;

  /**
   * Set static fields with current building context data
   */
  static create(options: BuildContextOptions) {
    if (options.dateScalarMode !== undefined) {
      this.dateScalarMode = options.dateScalarMode;
    }
    if (options.scalarsMap !== undefined) {
      this.scalarsMaps = options.scalarsMap;
    }
    if (options.validate !== undefined) {
      this.validate = options.validate;
    }
    if (options.authChecker !== undefined) {
      this.authChecker = options.authChecker;
    }
  }

  /**
   * Restore default settings
   */
  static reset() {
    this.dateScalarMode = "isoDate";
    this.scalarsMaps = [];
    this.validate = true;
  }
}

// initialize fields
BuildContext.reset();
