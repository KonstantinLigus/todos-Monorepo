/* eslint-disable no-console */

import 'reflect-metadata';
import dataSource from './datasourse';

const connectDB = async () => {
  try {
    await dataSource.initialize();
    console.log('PostgreSQL Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
