import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { RESTService } from './rest';
import * as global from '../Service/global';

@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router, public rest: RESTService, private acvive: ActivatedRoute) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       // return true
        let url = global.hostname + state.url
        if (localStorage.getItem('loginSO') != null && localStorage.getItem('MenuList') != null) {
            let menu = JSON.parse(localStorage.getItem('MenuList')).filter(f => f.Link === url)
            // //console.log(url)
            // //console.log(menu)
            if (menu.length > 0) {
                return true
            }
            else {
                localStorage.clear()
                this.router.navigate(['P_404']);
            }

        } else {
            //localStorage.setItem('loginSO',`{"Users_ID":"7D705F889F8D4E1D89206A6499ADA384","displayName":"Nguyễn Việt Tấn","anhDaiDien":"http://192.84.100.207/AdminApi/Content/noimages.gif","UserCode":"017677","Department":"85a79fe3-dbba-4c3a-86ef-646052e4dfda","Level":4,"Chucvu":"Chuyên viên sơ cấp","dept":{"id":"85a79fe3-dbba-4c3a-86ef-646052e4dfda","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"AIT1000","bophan_ten":"Ứng dụng","congty_id":null,"idcha":"98556f84-6d3e-42fa-a084-6b9d22839181","logo":null,"muc":"A04","thutu":0,"tinhtrang":true},"PhongBanParent":[{"id":"98556f84-6d3e-42fa-a084-6b9d22839181","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"AIT0000","bophan_ten":"IT","congty_id":null,"idcha":"f8d05c95-b6ba-4bf7-ad9b-11fc8d1aab43","logo":null,"muc":"A03","thutu":0,"tinhtrang":true},{"id":"f8d05c95-b6ba-4bf7-ad9b-11fc8d1aab43","bophan_diachi":null,"bophan_dienthoai":null,"bophan_ma":"A000000","bophan_ten":"Quản lý","congty_id":null,"idcha":null,"logo":null,"muc":"A02","thutu":0,"tinhtrang":true}],"PhongBanParentID":"98556f84-6d3e-42fa-a084-6b9d22839181","tenPhongBan":"Quản lý/IT/Ứng dụng","Language":[{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"20AF6DED9C5A435681AA4CA43EF0B302","maCode":"ButtonSend","tenTieuDe":"Gửi"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"2141B32EB145462FB1628FE246981D85","maCode":"TitleNumberPage","tenTieuDe":"trong số"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"282E87187FFB4AA98CCE28867F3C86FC","maCode":"TitleNguoiLap","tenTieuDe":"Người lập"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"2A6762B9E2D344A695C0AC903D484486","maCode":"TitleLuuLai","tenTieuDe":"Lưu lại"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"3307066888B64AF692706321AE7EAE72","maCode":"ButtonExit","tenTieuDe":"Thoát"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"36040574401143E49050D447B74EFE52","maCode":"ButtonSendTo","tenTieuDe":"Gửi đích danh"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"3B03858B8829481EA09D792D97088755","maCode":"NotifyPhanLoaiBai","tenTieuDe":"Cải tiến này chưa được phân loại bài"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"4684A2539B4C4559931A4FF060BF4FD5","maCode":"NotifyThongBao","tenTieuDe":"Thông báo"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"4D06B2BD91E44F118C6465E78E403B25","maCode":"TitleNguoiThucHien","tenTieuDe":"Người Thực Hiện"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"5DE6EA9957EE4CEC91DFACF489503367","maCode":"TitlSearch","tenTieuDe":"Tìm kiếm ..."},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"6863F177DB53449C9EF05692184A1A28","maCode":"TitleTenCongViec","tenTieuDe":"Tên công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"8B4E64C879744F2790621ADD832F9060","maCode":"TitleTacVu","tenTieuDe":"Tác vụ"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"A2889D265B2B4A398967B31C7B198149","maCode":"ButtonReject","tenTieuDe":"Trả lại"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"A2AC633978DB428DAB19A3282E68F450","maCode":"TitleChucNang","tenTieuDe":"Chức năng"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"AB70967FA2B1456DA8EEAB5F4EBB8EAB","maCode":"TitleTienTrinh","tenTieuDe":"Tiến trình"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"AEA4C6996E9F4BB6AF3EC36BF6B6EF89","maCode":"TitlePBYeuCau","tenTieuDe":"Bộ Phận Yêu Cầu"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"B4A8BD81B39F4B82B171149F70EDAA75","maCode":"TitleNoiDungCongViec","tenTieuDe":"Nội dung công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"CE89B5496E6047DDB42FD84F135C9668","maCode":"TitleMaCongViec","tenTieuDe":"Mã công việc"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"D0D593B51E4949C4B639BCEF02439A0F","maCode":"TitleNhomXuLy","tenTieuDe":"Nhóm xử lý"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"E394E6C48A9A425996197AAFA5BE7838","maCode":"TitleLichSuTrinhKy","tenTieuDe":"Lịch Sử Trình Ký"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"EC594AA65D5549DA990EB13D4BB52A9F","maCode":"TitleSTT","tenTieuDe":"STT"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"F750087CBCFB4AAE861A4281DE103303","maCode":"TitleEventLog","tenTieuDe":"Ghi Chú Trình Ký"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"FC3C42D32D68497E952B7C4B8AE5F08B","maCode":"TitleNgayLap","tenTieuDe":"Ngày lập"},{"A0008_ID":"B98F0A1E0DB0472E96C858ABA0DD6665","A0009_ID":"FDF4AF3E42774B7A8FBBF588572E048B","maCode":"TitleKyVaGui","tenTieuDe":"Ký Và Gửi"}]}`)
            this.router.navigate(['P_404']);
            return false;
        }
    }
}