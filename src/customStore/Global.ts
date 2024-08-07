import ModuleUser from "./User"
import ModuleCommon from "./Common"
class ModuleStore {
	constructor() {}
	user = new ModuleUser()
	common = new ModuleCommon()
}
const Global = new ModuleStore()
export default Global