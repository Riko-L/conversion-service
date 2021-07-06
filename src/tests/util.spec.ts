import { createConversionRequestBody } from "./helper/dataFactory"
import { executeShellCommand } from "../util"
import { transformRequestBodyToConversionFile } from "../service/conversion/util"
describe("It should pass all tests for utility functions", () => {
	it("should execute shell commands without an incident", async () => {
		/* Arrange */
		const command = "ls -ll"
		/* Act */
		const getCommandResponse = async (
			command: string
		): Promise<string> => await executeShellCommand(command)
		/* Assert */
		await expect(getCommandResponse(command)).resolves.not.toThrow()
	})
	it("should propagate the error from the shell", async () => {
		/* Arrange */
		const command = "ls -a /non-existent-folder"
		/* Act */
		/* Assert */
		await expect(executeShellCommand(command)).rejects.toThrow()
	})
	it("should transform a requestbody correctly into a conversionFile", () => {
		/* Arrange */
		const requestBody = createConversionRequestBody()
		/* Act */
		const transformedConversionFile = transformRequestBodyToConversionFile(requestBody)
		/* Assert */
		expect(transformedConversionFile).not.toBeUndefined()
		expect(transformedConversionFile).toHaveProperty("conversionId")
		expect(transformedConversionFile).toHaveProperty("path")
		expect(transformedConversionFile.retries).toBe(0)
	})
})