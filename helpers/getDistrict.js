function getDistrict(district) {
    if (!district) {
        return `unassigned`
    }

    return district.districtName
}

module.exports = getDistrict