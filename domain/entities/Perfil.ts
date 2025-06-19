export class Perfil {
    public nome: string;
    public image: string;

    private constructor(nome: string, imagem: string) {
        this.nome = nome;
        this.image = imagem;
    }

    public static create(nome: string): Perfil {
        return new Perfil(nome, this.randomImage())
    }

    private static randomImage(): string{

        let imgs = ["https://images.pexels.com/photos/5023686/pexels-photo-5023686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/5023690/pexels-photo-5023690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/20278576/pexels-photo-20278576/free-photo-of-arte-sombrio-escuro-vintage.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/35797/carnival-mask-costume-panel.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://static-00.iconduck.com/assets.00/thor-hammer-icon-512x512-m5xfr3pr.png",
            "https://t3.ftcdn.net/jpg/04/43/27/44/360_F_443274438_O9ZIrQ7mjiOh4vKV6hPmPwrwRsBNMJzq.jpg"]
        let indiceAleatorio = Math.floor(Math.random() * imgs.length);
        return imgs[indiceAleatorio]

    }

}