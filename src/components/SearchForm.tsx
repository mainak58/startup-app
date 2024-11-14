import Form from "next/form";
import SearchButton from "./ui/search-button";


export default function SearchForm() {
    return (
        <Form action="/posts" className="flex gap-2">
            <input name="query"  className="p-2"/>
            <SearchButton />
        </Form>
    );
}
