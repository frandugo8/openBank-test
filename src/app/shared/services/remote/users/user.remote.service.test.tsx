
import "@testing-library/react"
import { UserRemoteService } from "./user.remote.service"

describe("UserRemoteService", () => {
  it('should return 200 when data with good format is sent', async () => {
     const result: any = await UserRemoteService.changeMasterPass("12345678zA", "12345678zA", "test")
     expect(result.status).toBe(200)
  })

  it('should return 401 or 503 when data is sent with bad format', async () => {
    const result: any = await UserRemoteService.changeMasterPass("12345678", "12345678zA", "test")
    expect(result.status).toBe(401)
 })
})