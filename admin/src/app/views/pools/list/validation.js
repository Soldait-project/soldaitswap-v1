
import config from '../../../config/config'
var imageUrl = config.imageUrl

export async function imageData(result) {

    var image1 =
        result &&
            result.farms &&
            result.farms.bannerFile_1 &&
            result.farms.bannerFile_1 != ''
            ? imageUrl + 'adv/' + result.farms.bannerFile_1
            : ''

    var image2 =
        result &&
            result.farms &&
            result.farms.bannerFile_2 &&
            result.farms.bannerFile_2 != ''
            ? imageUrl + 'adv/' + result.farms.bannerFile_2
            : ''

    var image3 =
        result &&
            result.farms &&
            result.farms.bannerFile_3 &&
            result.farms.bannerFile_3 != ''
            ? imageUrl + 'adv/' + result.farms.bannerFile_3
            : ''

    var image4 =
        result &&
            result.farms &&
            result.farms.bannerFile_4 &&
            result.farms.bannerFile_4 != ''
            ? imageUrl + 'adv/' + result.farms.bannerFile_4
            : ''

    var image5 =
        result &&
            result.farms &&
            result.farms.bannerFile_5 &&
            result.farms.bannerFile_5 != ''
            ? imageUrl + 'adv/' + result.farms.bannerFile_5
            : ''


    return {
        image1,
        image2,
        image3,
        image4,
        image5
    }
}


export async function getFormdata(swapImage) {

    var swapData = new FormData()

    if (swapImage.bannerFile_1 && swapImage.bannerFile_1 !== '') {
        swapData.append('bannerFile_1', swapImage.bannerFile_1)
    }
    if (swapImage.bannerFile_2 && swapImage.bannerFile_2 !== '') {
        swapData.append('bannerFile_2', swapImage.bannerFile_2)
    }
    if (swapImage.bannerFile_3 && swapImage.bannerFile_3 !== '') {
        swapData.append('bannerFile_3', swapImage.bannerFile_3)
    }
    if (swapImage.bannerFile_4 && swapImage.bannerFile_4 !== '') {
        swapData.append('bannerFile_4', swapImage.bannerFile_4)
    }
    if (swapImage.bannerFile_5 && swapImage.bannerFile_5 !== '') {
        swapData.append('bannerFile_5', swapImage.bannerFile_5)
    }


    return swapData;


}

export async function imageValidation(id, width, height) {

    if (id == 1) {
        if (
            width >= 320 &&
            width <= 330 &&
            height >= 100 &&
            height <= 110
        ) {
            return true;
        } else {
            return false;
        }
    }

    if (
        id == 2 ||
        id == 3 ||
        id == 4 ||
        id == 5
    ) {
        if (
            width >= 728 &&
            width <= 738 &&
            height >= 90 &&
            height <= 100
        ) {
            return true;
        } else {
            return false;
        }
    }
}
