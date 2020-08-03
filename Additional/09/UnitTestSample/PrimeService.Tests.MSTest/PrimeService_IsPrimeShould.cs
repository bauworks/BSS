using Microsoft.VisualStudio.TestTools.UnitTesting;
using Prime.Services;

namespace Prime.UnitTests.MSTest.Services
{
    [TestClass]
    public class PrimeService_IsPrimeShould
    {
        private readonly PrimeService primeService;

        public PrimeService_IsPrimeShould()
        {
            this.primeService = new PrimeService();
        }

        // [TestMethod]
        // public void IsPrime_InputIs1_ReturnFalse()
        // {
        //     var result = this.primeService.IsPrime(1);

        //     Assert.IsFalse(result, "1 should not be prime.");
        // }

        [DataTestMethod]
        [DataRow(-1)]
        [DataRow(0)]
        [DataRow(1)]
        public void IsPrime_ValuesLessThan2_ReturnFalse(int value)
        {
            var result = this.primeService.IsPrime(value);

            Assert.IsFalse(result, $"{value} should not be prime.");
        }
    }
}
