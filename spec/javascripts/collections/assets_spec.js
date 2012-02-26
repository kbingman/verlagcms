describe("Assets", function () {
  
  var asset_data = [{
    "created_at":"2011-10-09T19:24:48Z",
    "file_name":"Zooey Deschanel by Ellen von Unwerth 2.jpg",
    "folder_id":"4eafa19a73c44f0862000002",
    "id":"4e91f50073c44f517a00366a",
    "tag_list":"",
    "tags":["ellen", "woman"],
    "title":"Zooey Deschanel by Ellen von Unwerth 2"
  }];
  
  
  beforeEach(function () {
    this.assets = new Verlag.Collection.Assets(asset_data);
  });
  
  it("creates a assets from data", function () {
    expect(this.assets.length).toEqual(1);
  });
  
  // it("returns the tags", function(){
  //   expect(Asset.tags()).toEqual(["ellen", "woman"]);
  // })
  // 
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
  //   expect(Folder.asJSON()).toEqual([folderData]);
  // });
  
});
