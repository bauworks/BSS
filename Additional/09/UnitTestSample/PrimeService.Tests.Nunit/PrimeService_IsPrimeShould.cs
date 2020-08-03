using NUnit.Framework;
using Prime.Services;

namespace Prime.UnitTests.Nunit.Services
{
    [TestFixture]
    public class PrimeService_IsPrimeShould
    {
        private PrimeService primeService;

        [SetUp]
        public void Setup()
        {
            this.primeService = new PrimeService();
        }

        // [Test]
        // public void Test1()
        // {
        //     var result = this.primeService.IsPrime(1);

        //     Assert.IsFalse(result, "1 should not be prime.");
        // }

        [TestCase(-1)]
        [TestCase(0)]
        [TestCase(1)]
        public void IsPrime_ValuesLessThan2_ReturnFalse(int value)
        {
            var result = this.primeService.IsPrime(value);

            Assert.IsFalse(result, $"{value} should not be prime");
        }
    }
}