describe("Asset", function () {
  
  var asset_data = {
    "created_at":"2011-10-09T19:24:48Z",
    "file_name":"Zooey Deschanel by Ellen von Unwerth 2.jpg",
    "folder_id":"4eafa19a73c44f0862000002",
    "id":"4e91f50073c44f517a00366a",
    "tag_list":"",
    "tags":["ellen", "woman"],
    "title":"Zooey Deschanel by Ellen von Unwerth 2"
  }
  
  
  beforeEach(function () {
    this.asset = new Verlag.Model.Asset(asset_data);
  });
  
  it("creates a asset from data with a title", function () {
    expect(this.asset.get('title')).toEqual('Zooey Deschanel by Ellen von Unwerth 2');
  });
  
  it("creates a asset from data with a filename", function () {
    expect(this.asset.get('file_name')).toEqual('Zooey Deschanel by Ellen von Unwerth 2.jpg');
  });
  
  // it("returns the tags", function(){
  //   expect(Asset.tags()).toEqual(["ellen", "woman"]);
  // })
  
  // it("returns a JSON object of itself", function(){
  //   expect(this.asset.asJSON()).toEqual(assetData);
  // });
  // 
  // it("returns a JSON object of itself for mustache templates", function(){
  //   assetData['query_path'] = '';
  //   expect(this.asset.toMustache()).toEqual(assetData);
  // });
  // 
  // it("returns a JSON object of all assets", function(){
  //   expect(Asset.asJSON()).toEqual([assetData]);
  // });
  // 
  // it("returns all assets with the corresponding folder_id", function(){
  //   expect(Asset.find_all_by_folder_id('4eafa19a73c44f0862000002').all()).toEqual([this.asset]);
  // });
  
});
