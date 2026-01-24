interface IDatabase {
  getAsset(fileName: string): Promise<Buffer>;
}

export default IDatabase;
