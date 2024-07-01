export class UtilsBaseExceptionLangValidator {
  static exceptionStringRestaurantBrand() {
    return `Id thương hiệu, Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng.`;
  }

  static exceptionStringBranch() {
    return `Id chi nhánh, Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng.`;
  }

  static exceptionListBranch() {
    return `Id chi nhánh, Nếu truyền [] là lấy hết ngược lại sẽ lấy theo kết quả người dùng.`;
  }

  //Techres_lead : thông tin nhà hàng
  static exceptionTechresLeads() {
    return `Id thông tin nhà hàng , Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng`;
  }

  static exceptionStringFromDate() {
    return `Thời gian bắt đầu, Nếu truyền rỗng('') là lấy hết, ngược lại sẽ lấy theo kết quả người dùng.
    \n . Các định dạng: lấy theo ngày, theo tuần: dd/mm/YYYY, 
    \n . Các định dạng: lấy theo tháng: 01/mm/YYYY, 
    \n . Các định dạng: lấy theo năm: 01/01/YYYY
  `;
  }

  static exceptionStringToDate() {
    return `Thời gian kết thúc, Nếu truyền rỗng('') là lấy hết, ngược lại sẽ lấy theo kết quả người dùng.
    \n . Các định dạng: lấy theo ngày, theo tuần: dd/mm/YYYY, 
    \n . Các định dạng: lấy theo tháng: 01/mm/YYYY, 
    \n . Các định dạng: lấy theo năm: 01/01/YYYY
      `;
  }

  static exceptionStringKeySearch(){
    return `Tiềm kiếm, Nếu truyền rỗng("") thì sẽ lấy hết ngược lại sẽ lấy theo giá trị người dùng truyền vào!`;
  }

  static exceptionStringGroupByTypeSupplier() {
    return `.Type để lấy định dạng 
  \n . Type = 1  group theo giờ trong ngày , 
  \n . Type = 2 group theo ngày , 
  \n . Type = 3 group theo tuần ,
  \n . Type = 4 group theo tháng,
  \n . Type = 5 group theo năm,
  
  -- Quy ước các ngày trong tuần của MSQL
      -- Thứ 2: 0
      -- Thứ 3: 1
      -- Thứ 4: 2
      -- Thứ 5: 3
      -- Thứ 6: 4
      -- Thứ 7: 5
      -- CN: 6
`;
  }

  static exceptionStringReportType() {
    return `Loại báo cáo , sẽ trả về các kiểu báo cáo theo yêu cầu của người dùng 
    \n . 0 : lấy theo thời gian (giờ) hiện tại , 
    \n . 1 : lấy theo ngày hiện tại , 
    \n . 2 : lấy theo tuần hiện tại, 
    \n . 3 : lấy theo tháng hiện tại, 
    \n . 4 : lấy theo 3 tháng gần nhất , 
    \n . 5 : lấy theo năm hiện tại , 
    \n . 6 : lấy theo 3 năm gần nhất , 
    \n . 7 : lấy tất cả các tháng , 
    \n . 8 : lấy tất cả các năm  , 
    \n . 9 : lấy theo ngày hôm qua , 
    \n . 10 : lấy theo tháng trước , 
    \n . 11 : lấy theo năm trước `;
  }

  static exceptionStringLimit() {
    return `Giới hạn phần tử lấy lên, Mặc định sẽ lấy 20 phần tử nếu người dùng không truyền vào.`;
  }

  static exceptionStringPage() {
    return `Phân trang người dùng, mặc định sẽ lấy trang đầu tiên nếu người dùng không truyền vào.`;
  }

  static exceptionReportType() {
    return `report_type: 1 group theo giờ trong ngày 
    .\n .report_type: 2 group theo ngày
    .\n .report_type: 3 group theo tuần
    .\n .report_type: 4 group theo tháng
    .\n .report_type: 5 group theo năm`;
  }

  // BranchInnerInventory
  static exceptionBranchInnerInventoryType() {
    return `Loại kiểm kê, Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng`;
  }

  static exceptionFromBranchInventoryReport() {
    return `Kiểm kê từ, Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng`;
  }

  static exceptionToBranchInventoryReport() {
    return `Kiểm kê đến, Nếu truyền -1 là lấy hết ngược lại sẽ lấy theo kết quả người dùng`;
  }

  static exceptionBranchInventoryReportId() {
    return `Id của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportCode() {
    return `Code của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportName() {
    return `Tên của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportPrefix() {
    return `Prefix của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportPrice() {
    return `Giá nguyên liệu của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportNormalizeName() {
    return `normalize_name của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportMaterialCategoryId() {
    return `Id danh mục nguyên liệu của phiếu kiểm kê kho nội bộ`;
  }

  static exceptionBranchInventoryReportMaterialCategoryName() {
    return `Tên danh mục nguyên liệu của phiếu kiểm kê kho nội bộ`;
  }

  // BranchInnerInventory


}
