'use strict';

import Sequelize from 'sequelize';
const { Model } = Sequelize;
import { sequelize, safeMirrorDbHandler } from '../../database';
import { Project } from '../projects';
import { Unit } from '../units';

import ModelTypes from './labels.modeltypes.cjs';
import { LabelMirror } from './labels.model.mirror';

class Label extends Model {
  static associate() {
    Label.belongsTo(Project, {
      targetKey: 'warehouseProjectId',
      foreignKey: 'warehouseProjectId',
    });

    // https://gist.github.com/elliette/20ddc4e827efd9d62bc98752e7a62610#some-important-addendums
    Label.belongsToMany(Unit, {
      foreignKey: 'labelId',
      through: 'label_unit',
      as: 'unit',
    });

    safeMirrorDbHandler(() => {
      LabelMirror.belongsTo(Project, {
        targetKey: 'warehouseProjectId',
        foreignKey: 'warehouseProjectId',
      });

      LabelMirror.belongsToMany(Unit, {
        foreignKey: 'labelId',
        through: 'label_unit',
        as: 'unit',
      });
    });
  }

  static async create(values, options) {
    safeMirrorDbHandler(() => LabelMirror.create(values, options));
    return super.create(values, options);
  }

  static async destroy(values, options) {
    safeMirrorDbHandler(() => LabelMirror.destroy(values, options));
    return super.destroy(values, options);
  }

  static async upsert(values, options) {
    safeMirrorDbHandler(() => LabelMirror.upsert(values, options));
    return super.upsert(values, options);
  }
}

Label.init(ModelTypes, {
  sequelize,
  modelName: 'label',
  timestamps: true,
});

export { Label };
